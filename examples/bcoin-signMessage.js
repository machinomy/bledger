'use strict';

const { SHA256, secp256k1 } = require('bcrypto')

const bledger = require('../lib/bledger');
const {LedgerBcoin, LedgerTXInput} = bledger;
const {Device} = bledger.HID;
const Logger = require('blgr');

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
  console.log(`signing: ${message}`);
  message = Buffer.from(message, 'utf8');
  message = SHA256.digest(message);

  const data = await bcoinApp.signMessage(message, path);
  console.log('response:');
  console.log(data);

  const r = Buffer.from(data.r, 'hex');
  const s = Buffer.from(data.s, 'hex');

  // recovery param
  const param = data.v;

  // r|s format
  const rs = Buffer.concat([r,s]);
  const pubkey = secp256k1.recover(message, rs, param);

  const valid = secp256k1.verify(message, rs, pubkey);
  console.log(`valid: ${valid}`);

  await device.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

