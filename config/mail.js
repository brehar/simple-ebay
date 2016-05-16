'use strict';

var sendgrid = require('sendgrid')(process.env.SENDGRID_KEY);

exports.sendVerify = (user, cb) => {
    var html = `<p>Thanks ${user.firstname}, for signing up for myBay Auctions! Please verify your account by clicking this link:</p><a href="${user.makeVerifyLink()}">Verify</a>`;

    sendgrid.send({
        to: user.email,
        from: 'do_not_reply@mybayauctions.com',
        subject: 'Verify Your myBay Auctions Account',
        html: html
    }, cb);
};