'use strict';

const MTX = require('bcoin/lib/primitives/mtx');
const Amount = require('bcoin/lib/btc/amount');
const Keyring = require('bcoin/lib/primitives/keyring');
const {Script} = require('bcoin/lib/script');

const { SHA256 } = require('bcrypto')
const { secp256k1 } = require('bcrypto/lib/js/secp256k1')

const bledger = require('../lib/bledger');
const {LedgerBcoin, LedgerTXInput} = bledger;
const {Device} = bledger.HID;
const Logger = require('blgr');

const fundUtil = require('../test/util/fund');

(async () => {
  const devices = await Device.getDevices();

  const logger = new Logger({
    console: true,
    level: 'info'
  });

  await logger.open();

  const device = new Device({
    device: devices[0],
    timeout: 20000,
    logger: logger
  });

  await device.open();

  const path = "m/44'/0'/0'/0/0";

  const bcoinApp = new LedgerBcoin({ device });

  let message = 'hello world';
  message = Buffer.from(message, 'utf8');
  message = SHA256.digest(message);

  const signature = await bcoinApp.signMessage(message, path);

  const hdpubkey = await bcoinApp.getPublicKey(path);
  const { publicKey } = hdpubkey;
  const ring = Keyring.fromPublic(publicKey);

  const valid = ring.verify(message, signature);
  console.log(`valid: ${valid}`);

  await device.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

