'use strict';

var express = require('express');
var router = express.Router();

var Auction = require('../models/auction');
var User = require('../models/user');

router.get('/', User.isLoggedIn, (req, res) => {
    Auction.find({isActive: true}).exec((err, auctions) => {
        res.status(err ? 400 : 200).send(err || auctions);
    });
});

router.get('/myPostings/:id', User.isLoggedIn, (req, res) => {
    Auction.find({poster: req.params.id}).exec((err, auctions) => {
        res.status(err ? 400 : 200).send(err || auctions);
    });
});

router.get('/winningBids/:id', User.isLoggedIn, (req, res) => {
    Auction.find({currentBidder: req.params.id}).exec((err, auctions) => {
        res.status(err ? 400 : 200).send(err || auctions);
    });
});

router.get('/:id', User.isLoggedIn, (req, res) => {
    Auction.findById(req.params.id).populate('poster', '-password').exec((err, auction) => {
        res.status(err ? 400 : 200).send(err || auction);
    });
});

router.post('/', User.isLoggedIn, (req, res) => {
    var auction = new Auction(req.body);

    auction.save((err, savedAuction) => {
        res.status(err ? 400 : 200).send(err || savedAuction);
    });
});

router.delete('/:id', User.isLoggedIn, (req, res) => {
    Auction.findByIdAndRemove(req.params.id, err => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send();
        }
    });
});

router.put('/submitBid/:id', User.isLoggedIn, (req, res) => {
    var newBid = req.body.bid;
    var newLeader = req.body.user;

    Auction.findById(req.params.id, (err, auction) => {
        if (newBid <= auction.currentBid) {
            return res.status(400).send('New bid must be greater than the current bid.');
        }

        if (newLeader === auction.poster) {
            return res.status(400).send('You may not bid on your own items.');
        }

        var index = auction.pastBidders.indexOf(newLeader);
        var oldLeader = auction.currentBidder;

        auction.currentBid = newBid;
        auction.currentBidder = newLeader;
        auction.pastBidders.push(oldLeader);

        if (index >= 0) {
            auction.pastBidders.splice(index, 1);
        }

        auction.save((err, savedAuction) => {
            res.status(err ? 400 : 200).send(err || savedAuction);
        });
    });
});

router.put('/:id', User.isLoggedIn, (req, res) => {
    Auction.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, auction) => {
        res.status(err ? 400 : 200).send(err || auction);
    });
});

module.exports = router;