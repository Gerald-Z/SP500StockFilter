import { Schema, model, models } from 'mongoose';

// This creates a model for the stock. 
const stockSchema = new Schema ({
    symbol: {
        type: String,
        unique: [true, 'This symbol already exists!'],
        required: [true, 'Symbol is required!'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
    },
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    industry: {
        type: String,
    },
    marketCap: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: 'The Market Cap must be an integer'
        }
    },
    pe: {
        type: Number,
        required: [true, 'The P/E ratio is required!'],
    },
    divYield: {
        type: Number,
        required: [true, 'The dividend yield is required!'],
    },
    beta: {
        type: Number,
        required: [true, 'The beta is required!'],
    },
    profitMargin: {
        type: Number,
        required: [true, 'The profit margin is required!'],
    },
})

const Stock = models.Stock || model("Stock", stockSchema);
export default Stock;
