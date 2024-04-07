import { Schema, model, models, ObjectId } from 'mongoose';

// This creates a model for the user. 
const watchlistSchema = new Schema ({
    userEmail: {
        type: String,
        required: [true, 'Email is required!'],
    },
    nameList: {
        type: [String],
    },
    tickerList: {
        type: [String],
        unique: [true, 'This Ticker is already in your watchlist!']
    },
    dateAddedList: {
        type: [Date],
    },
    costList: {
        type: [Number],
    },
})


const Watchlist = models.Watchlist || model("Watchlist", watchlistSchema);
export default Watchlist;
