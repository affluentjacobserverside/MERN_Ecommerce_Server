import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    description: {
        type: String,
        required: [true, 'Please enter description'],

    },
    price: {
       type: Number,
       required: [true, 'Please enter price'] 
    },
    stock: {
        type: Number,
        required: [true, 'Please enter your stock'],
    },
    images:[
        {
            public_id: String,
            url: String,
        }
    ],
    category: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },

    created_at: {
        type: Date,
        default: Date.now,
    }



});



export const Product = mongoose.model('Product', schema);
