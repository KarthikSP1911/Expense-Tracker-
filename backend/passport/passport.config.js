import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
	passport.serializeUser((user, done) => {
		// Only log in development
		if (process.env.NODE_ENV === "development") {
			console.log("Serializing user:", user.username);
		}
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await User.findById(id);
			// Only log in development
			if (process.env.NODE_ENV === "development") {
				console.log("Deserializing user:", user?.username);
			}
			done(null, user);
		} catch (err) {
			console.error("Error deserializing user:", err);
			done(err);
		}
	});

	passport.use(
		new GraphQLLocalStrategy(async (username, password, done) => {
			try {
				const user = await User.findOne({ username });
				if (!user) {
					throw new Error("Invalid username or password");
				}
				const validPassword = await bcrypt.compare(password, user.password);

				if (!validPassword) {
					throw new Error("Invalid username or password");
				}

				return done(null, user);
			} catch (err) {
				return done(err);
			}
		})
	);
};
