const {recoverPersonalSignature} = require('@metamask/eth-sig-util')

module.exports.getSignatureAddress = function (data, signature) {
    return recoverPersonalSignature({data, signature});
}
