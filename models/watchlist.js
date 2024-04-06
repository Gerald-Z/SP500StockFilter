import { Schema, model, models, ObjectId } from 'mongoose';

// This creates a model for the user. 
const watchlistSchema = new Schema ({
    userEmail: {
        type: String,
        required: [true, 'Email is required!'],
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
    notesList: {
        type: [String],
    }
})


const Watchlist = models.Watchlist || model("Watchlist", watchlistSchema);
export default Watchlist;
