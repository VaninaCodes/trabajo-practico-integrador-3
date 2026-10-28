import mongoose from "mongoose";

export const startDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Se conecto a la DB!");
    } catch(error){
        console.log("Error al conectarse :c", error.message);
    }
};