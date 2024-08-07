import argon2 from "argon2";

import UserModel from "../models/user-model";
import ApiError from "../exeptions/api-error";
import SupplierModel from "../models/supplier-model";
import jwt from "jsonwebtoken";

class UserService {
    async registration(email: string, password: string) {
        const candidate = await UserModel.findOne({email});
        if (candidate) {
            throw ApiError.BadRequest(`A supplier with this email address ${email} already exists`);
        }

        const hashPassword: string = await argon2.hash(password);
        const userDB = new UserModel({
            device_ids: [],
            scenario_ids: [],
            email,
            password: hashPassword,
            role: "SUPER_ADMIN"
        });

        userDB.save();
        return userDB;
    }

    async login(email: string, password: string) {
        const user = await UserModel.findOne({email});
        if(!user) {
            throw ApiError.UnauthorizedError();
        }

        const isPasswordValid = await argon2.verify(user.password, password);
        if(!isPasswordValid) {
            throw ApiError.UnauthorizedError();
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET || 'your-secret-key',
            {expiresIn: "1h"}
        );

        return { token };
    }
}

export default new UserService();