import express from "express";
import { protect } from "../middleware/auth.js"; 
import { 
    createNote, 
    getNotes, 
    updateNote, 
    deleteNote 
} from "../controllers/note.controller.js";

const router = express.Router();

// GET all notes of logged-in user
router.get("/get-notes", protect, getNotes);

// CREATE a new note
router.post("/create-note", protect, createNote);

// UPDATE note by ID
router.put("/update-note/:id", protect, updateNote);

// DELETE note by ID
router.delete("/delete-note/:id", protect, deleteNote);

export default router;
