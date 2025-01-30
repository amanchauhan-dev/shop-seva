import mongoose from 'mongoose';



// Schema definition for User
const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, trim: true, lowercase: true },
        email: { type: String, required: true, unique: true, trim: true, lowercase: true },
        password: { type: String, required: true },

    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', UserSchema);
export default User;
