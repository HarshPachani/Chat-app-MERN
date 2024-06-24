import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { getSockets, getBase64 } from "../lib/helper.js";
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuid } from 'uuid';

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
    sameSite: "None",
    httpOnly: true,
    secure: true,
};

const emitEvent = (req, event, users, data) => {
    const io = req.app.get('io');
    const userSocket = getSockets(users);
    io.to(userSocket).emit(event, data);
};

const sendToken = (res, user, code, message) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

    return res
            .status(code)
            .cookie('token', token, cookieOptions).json({
                success: true,
                user,
                message,
            });
}

const uploadFilesToCloudinary = async (files = []) => {
    const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
                getBase64(file),
                {
                    resource_type: 'auto',
                    public_id: uuid(),
                },
                (err, result) => {
                    if(err) return reject(err);
                    resolve(result);
                }
            )
        });
    });

    try {
        const results = await Promise.all(uploadPromises);
        const formattedResults = results.map(result => ({
            public_id: result.public_id,
            url: result.url,
        }));
        return formattedResults;
    } catch (error) {
        throw new Error('Error Uploading files to Cloudinary', error);
    }
};

const deleteFilesFromCloudinary = async(public_id) => {
    if(public_id) {
        await cloudinary.uploader.destroy(public_id);
    }
};

export {
    connectDb,
    sendToken,
    cookieOptions,
    emitEvent,
    uploadFilesToCloudinary,
    deleteFilesFromCloudinary,
}