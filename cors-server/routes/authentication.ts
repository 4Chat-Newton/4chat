import bcrypt from "bcrypt";
import express, {Request, Response} from "express";
import jwt from "jsonwebtoken";

import {server} from "../server";

export const encryptPassword = async function (password: string) {
    let saltRounds = await bcrypt.genSalt(11);
    let hashPass = await bcrypt.hash(password, saltRounds);
    return hashPass;
};

export const validateUser = async function (password: string, hash: string) {
    let success: boolean = await bcrypt.compare(password, hash);
    return success;
};

export default {encryptPassword, validateUser};
