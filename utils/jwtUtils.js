import jwt from "jsonwebtoken"

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id,email:user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id,email:user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};
const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
export { generateAccessToken, generateRefreshToken,verifyToken };