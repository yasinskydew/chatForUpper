var dotenv = require('dotenv');
dotenv.config();
// only ES5 is allowed in this file
require('@babel/register');
require('@babel/polyfill');
// other babel configuration, if necessary
var app = require('./app.js');
