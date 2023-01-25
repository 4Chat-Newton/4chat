import bcrypt from "bcrypt";

export const encryptPassword = async function (password: string) {
    let saltRounds = await bcrypt.genSalt(11);
    let hashPass = bcrypt.hash(password, saltRounds);
    return hashPass
};

export const validateUser = async function (password: string, hash: string) {
    let success: boolean = await bcrypt.compare(password, hash);
    if (success) {
        console.log("success");
    } else {
        console.log("failure");
    }
};

export default { encryptPassword, validateUser };
