import mongoose from "mongoose";
import uniqueValidator from "mongoose-beautiful-unique-validation";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (value) => /\S+@\S+\.\S+/.test(value), 
                message: 'Invalid email format.',
            },
            message: 'Email "{VALUE}" is already registered.'
        },
        password: { type: String, required: true },
        is_active: { type: Boolean, required: true, default: true },
        is_delete: { type: Boolean, required: true,default: false },
        is_admin: { type: Boolean, required: true,default: false },
    },
    { timestamps: true }
);

userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("Users", userSchema);
export default User;