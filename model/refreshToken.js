import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  refreshToken: { type: String, required: true },
  expires: { type: Date, required: true }, 
}, { timestamps: true });

const RefreshToken = mongoose.model('RefreshTokens', refreshTokenSchema);
export default RefreshToken;
