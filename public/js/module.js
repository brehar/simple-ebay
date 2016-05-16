'use strict';

var app = angular.module('auctionApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/html/home.html',
        controller: 'homeCtrl'
    }).state('register', {
        url: '/register',
        templateUrl: '/html/register.html',
        controller: 'registerCtrl'
    }).state('registersuccess', {
        url: '/registersuccess',
        templateUrl: '/html/registersuccess.html'
    }).state('verifysuccess', {
        url: '/verifysuccess',
        templateUrl: '/html/verifysuccess.html'
    }).state('verifyfail', {
        url: '/verifyfail',
        templateUrl: '/html/verifyfail.html'
    }).state('login', {
        url: '/login',
        templateUrl: '/html/login.html',
        controller: 'loginCtrl'
    }).state('auctions', {
        url: '/auctions',
        templateUrl: '/html/auctions.html',
        controller: 'auctionsCtrl',
        resolve: {
            auctions: function(Auth, $q, $state) {
                return Auth.getProfile().catch(() => {
                    $state.go('login');
                    return $q.reject();
                });
            }
        }
    }).state('logout', {
        url: '/logout',
        templateUrl: '/html/logout.html',
        controller: 'logoutCtrl'
    }).state('post', {
        url: '/post',
        templateUrl: '/html/post.html',
        controller: 'postCtrl',
        resolve: {
            post: function(Auth, $q, $state) {
                return Auth.getProfile().catch(() => {
                    $state.go('login');
                    return $q.reject();
                });
            }
        }
    }).state('details', {
        url: '/details/:id',
        templateUrl: '/html/details.html',
        controller: 'detailsCtrl',
        resolve: {
            details: function(Auth, $q, $state) {
                return Auth.getProfile().catch(() => {
                    $state.go('login');
                    return $q.reject();
                });
            }
        }
    }).state('account', {
        url: '/account',
        templateUrl: '/html/account.html',
        controller: 'accountCtrl',
        resolve: {
            account: function(Auth, $q, $state) {
                return Auth.getProfile().catch(() => {
                    $state.go('login');
                    return $q.reject();
                });
            }
        }
    }).state('editauction', {
        url: '/edit/:id',
        templateUrl: '/html/edit.html',
        controller: 'editCtrl',
        resolve: {
            editauction: function(Auth, $q, $state) {
                return Auth.getProfile().catch(() => {
                    $state.go('login');
                    return $q.reject();
                });
            }
        }
    });

    $urlRouterProvider.otherwise('/');
});

app.filter('auctionEnds', function() {
    return function(createdAt, duration) {
        return moment(createdAt).add(duration, 'days').format('MMMM Do YYYY, h:mm:ss a');
    };
});