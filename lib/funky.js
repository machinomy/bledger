const MTX = require('bcoin/lib/primitives/mtx');
const CoinView = require('bcoin/lib/coins/coinview');

export function isMTX(obj) {
    return MTX.isMTX(obj) || (obj.constructor.toString() == MTX.toString())
}

export function isCoinView(obj) {
    return (obj instanceof CoinView) || (obj.constructor.toString() == CoinView.toString())
}
