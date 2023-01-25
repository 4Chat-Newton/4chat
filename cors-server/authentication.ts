import { EnumStringMember } from "@babel/types";
import bcrypt from "bcrypt";
import { validate } from "json-schema";

//------------- Password -----------------
const myPlaintextPassword = "Hannes420"; //! Ska laddas från db

export const encryptPassword = async function (password: string) {
    let saltRounds = await bcrypt.genSalt(11);
    let hashPass = await bcrypt.hash(password, saltRounds);
    console.log(hashPass);
    validateUser(password, hashPass);
};

export const validateUser = async function (password: string, hash: string) {
    let success: boolean = await bcrypt.compare(myPlaintextPassword, hash);
    if (success) {
        console.log("success " + password);
    } else {
        console.log("failure");
    }
};

export default { encryptPassword, validateUser };
