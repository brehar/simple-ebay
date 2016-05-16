'use strict';

var mongoose = require('mongoose');

var auctionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    startPrice: {
        type: Number,
        required: true,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number,
        required: true,
        enum: [1, 3, 5, 7]
    },
    currentBid: {
        type: Number,
        min: 0
    },
    currentBidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pastBidders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    isActive: {
        type: Boolean,
        default: true
    }
});

var Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;