import express, {Express} from "express";
import * as mongoose from "mongoose";
import passport from "passport";
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import bodyParser from "body-parser";
import path from "path";
import {Roles} from "./shared/enums/role-enum";

import errorMiddleware from "./middlewares/error-middleware";
import roleMiddleware from "./middlewares/role-middleware";
import authMiddleware from "./middlewares/auth-middleware";

import AuthRouter from "./router/auth-router";
import SupplierRouter from "./router/supplier-router";
import DeviceRouter from "./router/device-router";
import PublisherRouter from "./router/publisher-router";
import ScenarioRouter from "./router/scenario-router";
import AudioFileRouter from "./router/audio-file-router";
import ToyTypeRouter from "./router/toy-type-router";
import AuthModel from "./models/user-model";
import PersonageObjectStateRouter from "./router/personage-object-state-router";
import PersonageObjectRouter from "./router/personage-object-router";
import DescriptionStateRouter from "./router/description-state-router";
import RightTransactionRouter from "./router/right-transaction-router";
import ToyRouter from "./router/toy-router";

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

app.use("/api/auth", AuthRouter);
app.use("/api/supplier", authMiddleware, roleMiddleware([Roles.SUPER_ADMIN]), SupplierRouter);
app.use("/api/device", authMiddleware, roleMiddleware([Roles.SUPER_ADMIN]), DeviceRouter);
app.use("/api/publisher", authMiddleware, roleMiddleware([Roles.SUPER_ADMIN]), PublisherRouter);
app.use("/api/scenario", authMiddleware, roleMiddleware([Roles.SUPER_ADMIN]), ScenarioRouter);
app.use("/api/audio_file", authMiddleware, roleMiddleware([Roles.SUPER_ADMIN]), AudioFileRouter);
app.use("/api/toy_type", authMiddleware, roleMiddleware([Roles.SUPER_ADMIN]), ToyTypeRouter);
app.use("/api/toy", authMiddleware, roleMiddleware([Roles.SUPER_ADMIN]), ToyRouter);
app.use("/api/personage_object_state", authMiddleware, roleMiddleware([Roles.SUPER_ADMIN]), PersonageObjectStateRouter);
app.use("/api/personage_object", authMiddleware, roleMiddleware([Roles.SUPER_ADMIN]), PersonageObjectRouter);
app.use("/api/description_state", authMiddleware, roleMiddleware([Roles.SUPER_ADMIN]), DescriptionStateRouter);
app.use("/api/right_transaction", authMiddleware, roleMiddleware([Roles.SUPER_ADMIN]), RightTransactionRouter);

app.use(errorMiddleware);

const startServer = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        app.listen(PORT, () => console.log(`Server is Fire at http://localhost:${PORT}`));
    } catch (error) {
        console.log(`There is an error on the server: ${error}`);
    }
}

startServer();