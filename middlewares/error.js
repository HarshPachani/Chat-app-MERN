const errorMiddleware = (err, req, res, next) => {
    err.message ||= 'Internal Server Error';
    err.code ||= 500;

    //Duplicate key error.
    if(err.code === 11000) {
        const error = Object.keys(err.keyPattern).join(', ');
        err.message = `Duplicate field - ${error}`;
        err.statusCode = 400;
    } 

    if(err.name === 'CastError') {
        const errorPath = err.path;
        err.message = `Invalid Format of Path - ${errorPath}`;
        err.statusCode = 400;
    }

    return res.status(err.code).json({
        success: false,
        message: err.message,
    });
}

const TryCatch = (passedFunc) => async (req, res, next) => {
    try {
        await passedFunc(req, res, next);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export {
    TryCatch,
    errorMiddleware,
}