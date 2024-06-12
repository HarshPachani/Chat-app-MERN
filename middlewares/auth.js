import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { User } from "../models/user.js";

const isAuthenticated = (req, res, next) => {
    const { token } = req.cookies;
    if(!token)
        return next(new ErrorHandler('Please Login to access the route', 401));

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData._id;
    next();
};

const socketAuthenticator = async (err, socket, next) => {
    try {
        if(err)
            return next(new ErrorHandler(err, 401));
        
        const authToken = socket.request.cookies.token;
        
        if(!authToken)
            return next(new ErrorHandler('Authentication Failed!'));
        
        const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);
        const user = await User.findById(decodedData._id);
        if(!user)
            return next(new ErrorHandler('Authentication Failed!'));

        socket.user = user;
        return next();
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler('Please login to access this route', 401));
    }
}

export { isAuthenticated, socketAuthenticator }