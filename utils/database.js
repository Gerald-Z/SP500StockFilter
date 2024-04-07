import mongoose from 'mongoose';

let isConnected = false; // track the connection status

export const connectTodb = async () => {
    mongoose.set('strictQuery', true); 

    if (isConnected) {
        return; 
    } 

    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            dbName: "SP500", 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
    } catch (error) {
        console.log(error);
    }
}
