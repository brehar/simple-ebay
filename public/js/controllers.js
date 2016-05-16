'use strict';

var app = angular.module('auctionApp');

app.controller('homeCtrl', function() {
    $('.parallax').parallax();
});

app.controller('registerCtrl', function($scope, $state, Auth) {
    $scope.registerUser = function() {
        Auth.registerUser($scope.newUser).then(res => {
            $state.go('registersuccess');
        });
    };
});

app.controller('loginCtrl', function($scope, $state, Auth) {
    $scope.loginUser = function() {
        Auth.loginUser($scope.user).then(res => {
            $state.go('auctions');
        });
    };
});

app.controller('auctionsCtrl', function($scope, Auction) {
    Auction.getActiveAuctions().then(res => {
        $scope.auctions = res.data;
    });
});

app.controller('logoutCtrl', function($state, Auth) {
    Auth.logoutUser().then(res => {
        $state.go('home');
    });
});

app.controller('postCtrl', function($scope, $state, Auction, Auth) {
    Auth.getProfile().then(res => {
        $scope.currentUser = res.data;
    }).catch(err => {
        $scope.currentUser = null;
    });

    $scope.postListing = function() {
        $scope.newListing.poster = $scope.currentUser._id;

        Auction.postListing($scope.newListing).then(res => {
            $state.go('auctions');
        });
    };
});

app.controller('detailsCtrl', function($scope, $state, Auction, Auth) {
    Auth.getProfile().then(res => {
        $scope.currentUser = res.data;
    }).catch(err => {
        $scope.currentUser = null;
    });

    Auction.getSingleAuction($state.params.id).then(res => {
        $scope.auction = res.data;
    });
    
    $scope.submitBid = function() {
        var info = {
            bid: $scope.newBid,
            user: $scope.currentUser._id
        };

        Auction.makeBid($scope.auction._id, info).then(res => {
            $scope.auction.currentBid = info.bid;
            $scope.newBid = null;
        });
    };
});

app.controller('accountCtrl', function($scope, Auth, Auction) {
    Auth.getProfile().then(res => {
        $scope.currentUser = res.data;

        Auction.getMyPostings($scope.currentUser._id).then(res => {
            $scope.postings = res.data;
        });
        
        Auction.getWinningBids($scope.currentUser._id).then(res => {
            $scope.winnings = res.data;
        });
    }).catch(err => {
        $scope.currentUser = null;
    });

    $scope.deleteauction = function(id, posting) {
        var index = $scope.postings.indexOf(posting);

        Auction.removeAuction(id).then(res => {
            $scope.postings.splice(index, 1);
        });
    };
});

app.controller('editCtrl', function($scope, $state, Auction) {
    Auction.getSingleAuction($state.params.id).then(res => {
        $scope.editListing = res.data;
    });

    $scope.cancelEdit = function() {
        $scope.editListing = null;
        $state.go('account');
    };

    $scope.saveChanges = function() {
        Auction.updateListing($scope.editListing._id, $scope.editListing).then(res => {
            $state.go('account');
        });
    };
});