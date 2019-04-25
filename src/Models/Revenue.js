const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const RevenueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    categories: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    ingredients: [{
        type: String,
        required: true,
    }],
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: "users"}],
},{
    timestamps: true
});

RevenueSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('revenues', RevenueSchema);