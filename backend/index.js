import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import auth from './routes/auth.js';
import notes from './routes/notes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;
mongoose.connect("mongodb://127.0.0.1:27017",{}); 

app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/auth", auth);
app.use("/api/notes", notes);

app.get("/", async(req,res) => {
    res.send("hello world!!! workking");
}) 

app.listen(port, () => {
    console.log(`iNoteBook backend is listening on http://localhost:${port}`);
})
