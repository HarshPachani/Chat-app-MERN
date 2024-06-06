import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: 'WE_CHAT'
    })
    .then((data) => {
        console.log(`Connected to DB: ${data.connection.host}`);
    })
    .catch(err => { throw err });
}

const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
};

const sendToken = (res, user, code, message) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

    return res
            .status(code)
            .cookie('token', token, cookieOptions).json({
                success: true,
                user,
                message,
            })
}

export {
    connectDb,
    sendToken,
    cookieOptions,
}