// Require
var postmark = require("postmark");

// Example request
var client = new postmark.ServerClient("");

client.sendEmail({
    "From": "admin@stargate2012.com",
    "To": "pixiwyn@gmail.com",
    "Subject": "Test from Postmark",
    "TextBody": "Hello from Postmark!"
});