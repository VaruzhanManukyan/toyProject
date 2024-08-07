import express, {Express} from "express";
import {ConnectOptions} from "mongodb";
import * as mongoose from "mongoose";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bodyParser from "body-parser";

import errorMiddleware from "./middlewares/error-middleware";
import SupplierRouter from "./router/supplier-router";
import UserRouter from "./router/user-router";
import UserModel from "./models/user-model";
import authMiddleware from "./middlewares/auth-middleware";

require("dotenv").config();

const PORT: string = process.env.PORT || "5000";
const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(express.json());
app.use(errorMiddleware);

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
        const user = await UserModel.findById(jwtPayload.sub);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error, false);
    }
}));

app.use("/api/auth", UserRouter);
app.use("/api/supplier", authMiddleware, SupplierRouter);


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