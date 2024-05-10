import express from "express";
import fetchUser from "../middleware/fetchUser.js";
import Note from "../models/Notes.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// ROUTE 1 - TO GET ALL THE NOTES. login required thats why we are using middleware
router.get("/fetchnotes", fetchUser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

// ROUTE2  ----- TO ADD NEW NOTE USING POST . Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description ").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = await new Note({
        title: title,
        description: description,
        tag: tag,
        user: req.user.id, //-------------------------------------------------------------------IMPORTANT
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      res.status(401).send({ error: "Internal server issue" });
    }
  }
);


// ROUTE3 - UPDATE EXISTING NOTE. LOGIN REQUIRED. AND WE ALSO WANT TO GIVE ID OF NOTE WE WANT TO UPDATE
router.put("/updatenote/:id", fetchUser,async(req,res) =>{
    const {title, description, tag} = req.body;
    // Creating new note
    const newNote = {};
    if(title){ newNote.title = title};
    if(description){ newNote.description = description};
    if(tag){ newNote.tag = tag};

    // find the note to be updated
    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send({error: 'Not found'})
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote},{ new: true});
    res.json(note);
});


// ROUTE4 -----------> DELETE NOTE. LOGIN REQUIRED
router.delete("/deletenote/:id", fetchUser, async(req,res) => {
        // fetch note using id
        let note = await Note.findById(req.params.id);
        if(!note){ return res.status(404).send("Not found")}

        // we will check if the user who wants to delete note is owner of that note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json("Success: Note has been deleted");
})

export default router;
