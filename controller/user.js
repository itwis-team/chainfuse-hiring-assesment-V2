var jwt = require('jsonwebtoken');
const UserService = require("../service/user");
// const config = require("../config");
const {getSignatureAddress} = require("../helpers/signature");

const signUp = async (req, res) => {
  const {signature} = req.body;

  if (!signature) {
    return res.send({
      success: false,
      error: `Required: 'signature'`
    });
  }

  const walletAddress = getSignatureAddress(process.env.SIGNATURE_DATA, signature);

  UserService.addUser({walletAddress});

  return res.send({
    success: true,
    walletAddress,
  });
}

const logIn = async (req, res) => {
  const {signature} = req.body;

  if (!signature) {
    return res.send({
      success: false,
      error: `Required: 'data', 'signature'`
    });
  }

  const walletAddress = getSignatureAddress(process.env.SIGNATURE_DATA, signature);
  const user = await UserService.getUserBy({walletAddress});

  if (!user) {
    return res.send({
      success: false,
      error: 'Not registered'
    });
  }

  user.jwt_token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
  await user.save();

  return res.send({
    success: true,
    token: user.jwt_token
  });
}

const updateProfile = async (req, res) => {

}

const getSignatureData = async (req, res) => {
  return res.send({
    success: true,
    data: process.env.SIGNATURE_DATA
  });
}

module.exports = {
  signUp,
  logIn,
  updateProfile,
  getSignatureData,
}