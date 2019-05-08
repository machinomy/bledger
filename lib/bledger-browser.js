/*!
 * bledger-browser.js - Ledger communication for browser
 * Copyright (c) 2018, The Bcoin Developers (MIT License).
 * Copyright (c) 2019, Nodari Chkuaselidze (MIT License)
 * https://github.com/bcoin-org/bledger/pull/38
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

const LedgerError = require('./protocol/error');
const LedgerBcoin = require('./bcoin');
const LedgerTXInput = require('./txinput');
const U2F = require('./devices/u2f');
const WebUSB = require('./devices/webusb');

exports.bledger = exports;

exports.U2F = U2F;
exports.WebUSB = WebUSB;
exports.LedgerError = LedgerError;

exports.LedgerBcoin = LedgerBcoin;
exports.LedgerTXInput = LedgerTXInput;
