'use strict';
var crypto = require('crypto');

var genRandomString = function(length){
	return crypto.randomBytes(Math.ceil(length/2))
		.toString('hex')
		.slice(0,length);
};

function sha512(password, salt){
	var hash = crypto.createHmac('sha512', salt);
	hash.update(password);
	var value = hash.digest('hex');
	return {
		salt,
		hash:value
	};
}


function saltHashPassword(userpassword) {
	var salt = genRandomString(16);
	return sha512(userpassword, salt);
}

module.exports = {
	sha512,
	saltHashPassword
};