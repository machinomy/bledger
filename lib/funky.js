const MTX = require('bcoin/lib/primitives/mtx');
const TX = require('bcoin/lib/primitives/tx');
const CoinView = require('bcoin/lib/coins/coinview');

export function isTX(obj) {
    return TX.isTX(obj) || (obj.constructor.toString() == TX.toString()) || isMTX(obj)
}

export function isMTX(obj) {
    return MTX.isMTX(obj) || (obj.constructor.toString() == MTX.toString())
}

export function isCoinView(obj) {
    return (obj instanceof CoinView) || (obj.constructor.toString() == CoinView.toString())
}
