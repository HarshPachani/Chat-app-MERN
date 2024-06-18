import mongoose, { Schema, model } from "mongoose";
import { hash } from 'bcrypt';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            // required: true,
        },
        url: {
            type: String,
            // required: true,
        },
    }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    //This save event will trigger everytime we modify in user collections, so we don't want to change password everytime it changes any of the user field.
    if(!this.isModified('password')) return next();

    this.password = await hash(this.password, 10);
    next();
});

export const User = mongoose.models.User ||  model('User', userSchema); 