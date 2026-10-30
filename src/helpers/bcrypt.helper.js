import bcrypt from "bcryptjs";

// hashear la contraseña
export const hashPassword = async(password) => {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
}

// comparar la contraseña hasheada
export const comparePassword = async(password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
};