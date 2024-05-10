import mongoose from 'mongoose';
// import {userSchema} from './User.js';

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const Note = mongoose.model('note', noteSchema);
export default Note;

