'use strict';

var app = angular.module('auctionApp');

app.service('Auth', function($http) {
    this.getProfile = () => {
        return $http.get('/api/users/profile');
    };
    
    this.registerUser = newUser => {
        return $http.post('/api/users/register', newUser);
    };
    
    this.loginUser = user => {
        return $http.post('/api/users/authenticate', user);
    };
    
    this.logoutUser = () => {
        return $http.delete('/api/users/logout');
    };
});

app.service('Auction', function($http) {
    this.postListing = listing => {
        return $http.post('/api/auctions', listing);
    };

    this.getActiveAuctions = () => {
        return $http.get('/api/auctions');
    };

    this.getSingleAuction = id => {
        return $http.get(`/api/auctions/${id}`);
    };
    
    this.makeBid = (id, info) => {
        return $http.put(`/api/auctions/submitBid/${id}`, info);
    };

    this.getMyPostings = id => {
        return $http.get(`/api/auctions/myPostings/${id}`);
    };

    this.updateListing = (id, newListing) => {
        return $http.put(`/api/auctions/${id}`, newListing);
    };
    
    this.removeAuction = id => {
        return $http.delete(`/api/auctions/${id}`);
    };
    
    this.getWinningBids = id => {
        return $http.get(`/api/auctions/winningBids/${id}`);
    };
});