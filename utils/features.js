import mongoose from "mongoose";

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: 'WE_CHAT'
    })
    .then((data) => {
        console.log(`Connected to DB: ${data.connection.host}`);
    })
    .catch(err => { throw err });
}

export {
    connectDb,
}