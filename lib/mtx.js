const MTX = require('bcoin/lib/primitives/mtx');

export function isMTX(tx) {
    return MTX.isMTX(tx) || (tx.constructor.toString() == MTX.toString())
}
