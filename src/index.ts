import express, {Express} from "express";
import {ConnectOptions} from "mongodb";
import * as mongoose from "mongoose";
import passport from "passport";
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import bodyParser from "body-parser";
import path from "path";

import errorMiddleware from "./middlewares/error-middleware";
import authMiddleware from "./middlewares/auth-middleware";

import AuthRouter from "./router/auth-router";
import SupplierRouter from "./router/supplier-router";
import PublisherRouter from "./router/publisher-router";
import ScenarioRouter from "./router/scenario-router";
import AuthModel from "./models/auth-model";

require("dotenv").config();

const PORT: string = process.env.PORT || "5000";
const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(passport.initialize());

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
        const user = await AuthModel.findById(jwtPayload.id);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

app.use(express.json());
app.use(errorMiddleware);

app.use("/api/auth", AuthRouter);
app.use("/api/supplier", authMiddleware, SupplierRouter);
app.use("/api/publisher", authMiddleware, PublisherRouter);
app.use("/api/scenario", authMiddleware, ScenarioRouter);

const startServer = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_URL as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);
        app.listen(PORT, () => console.log(`Server is Fire at http://localhost:${PORT}`));
    } catch (error) {
        console.log(`There is an error on the server:\n ${error}`);
    }
}

startServer();