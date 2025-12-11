import Note from "../models/note.model.js";

// ===============================
// CREATE NOTE
// ===============================
export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content required" });
        }

        const note = await Note.create({
            title,
            content,
            userId: req.user._id
        });

        return res.status(201).json(note);

    } catch (err) {
        console.error("Create Note Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ===============================
// GET ALL NOTES OF LOGGED-IN USER
// ===============================
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });
        return res.json(notes);

    } catch (err) {
        console.error("Get Notes Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ===============================
// UPDATE NOTE
// ===============================
export const updateNote = async (req, res) => {
    try {
        const updated = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Note not found" });
        }

        return res.json(updated);

    } catch (err) {
        console.error("Update Note Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ===============================
// DELETE NOTE
// ===============================
export const deleteNote = async (req, res) => {
    try {
        const deleted = await Note.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!deleted) {
            return res.status(404).json({ message: "Note not found" });
        }

        return res.json({ message: "Deleted successfully" });

    } catch (err) {
        console.error("Delete Note Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};
