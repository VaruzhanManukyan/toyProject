import argon2 from "argon2";

import UserModel from "../models/user-model";
import SupplierModel from "../models/supplier-model";
import PublisherModel from "../models/publisher-model";

import ApiError from "../exceptions/api-error";
import jwt from "jsonwebtoken";
import {Roles} from "../shared/enums/role-enum";

class AuthService {
    async registration(email: string, password: string, role: string) {
        const candidate = await UserModel.findOne({email}) ||
                             await PublisherModel.findOne({email}) ||
                             await SupplierModel.findOne({email});

        if (candidate) {
            throw ApiError.BadRequest(`A user with this email address ${email} already exists`);
        }

        const hashPassword: string = await argon2.hash(password);
        const userDB = new UserModel({
            device_ids: [],
            scenario_ids: [],
            email,
            password: hashPassword,
            role
        });

        userDB.save();
        return userDB;
    }

    async login(email: string, password: string) {
        let user = await UserModel.findOne({email});
        if(!user) {
            user = await PublisherModel.findOne({email});
            if(!user){
                user = await SupplierModel.findOne({email});
                if(!user){
                    throw ApiError.UnauthorizedError();
                }
                user.role = Roles.SUPPLIER;
            }
            user.role = Roles.PUBLISHER;
        }

        const isPasswordValid: boolean = await argon2.verify(user.password, password);
        if(!isPasswordValid) {
            throw ApiError.UnauthorizedError();
        }

        const token: string = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET || 'your-secret-key',
            {expiresIn: "72h"}
        );

        return { token };
    }
}

export default new AuthService();