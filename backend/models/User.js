import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
        // we didnt call date.now() because we just want to intsert function not call it because we 
        // want it to get call when user gets created
    }
});

// user is the name of the model
const User = mongoose.model('user', userSchema);
export default User;
export {userSchema};

// we will use this scehma in our routes