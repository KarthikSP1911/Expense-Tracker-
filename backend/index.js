import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { buildContext } from "graphql-passport";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

import { connectDB } from "./db/connectDB.js";
import { configurePassport } from "./passport/passport.config.js";

import job from "./cron.js";

dotenv.config();
configurePassport();

job.start();

const __dirname = path.resolve();
const app = express();

const httpServer = http.createServer(app);

const MongoDBStore = connectMongo(session);

const store = new MongoDBStore({
	uri: process.env.MONGO_URI,
	collection: "sessions",
});

store.on("error", (err) => console.log("Session store error:", err));

// Apply CORS first
app.use(
	cors({
		origin: ["http://localhost:3000", "http://localhost:3001"],
		credentials: true,
	})
);

// Apply express.json before session
app.use(express.json());

// Session middleware MUST come before passport
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		},
		store: store,
	})
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
	typeDefs: mergedTypeDefs,
	resolvers: mergedResolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Ensure we wait for our server to start
await server.start();

// GraphQL endpoint
app.use(
	"/graphql",
	expressMiddleware(server, {
		context: async ({ req, res }) => {
			// Build context with graphql-passport
			const context = buildContext({ req, res });
			// Ensure req.user is accessible
			return {
				...context,
				req,
				res,
				user: req.user,
			};
		},
	})
);

// Serve static files in production
app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

// Graceful server startup with error handling
try {
	await new Promise((resolve, reject) => {
		httpServer.listen({ port: 4000 }, (err) => {
			if (err) reject(err);
			else resolve();
		});
	});
	await connectDB();
	console.log(`🚀 Server ready at http://localhost:4000/graphql`);
} catch (error) {
	console.error("Failed to start server:", error);
	process.exit(1);
}

// Graceful shutdown
process.on("SIGTERM", async () => {
	console.log("SIGTERM signal received: closing HTTP server");
	await server.stop();
	httpServer.close(() => {
		console.log("HTTP server closed");
		process.exit(0);
	});
});
