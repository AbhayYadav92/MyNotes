import { createContext, useEffect, useState, useContext } from "react";
import BACKEND_URL from "../api/url";
import { AuthContext } from "./AuthContext";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const { token } = useContext(AuthContext); // <-- TOKEN FROM AUTH
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Fetch All Notes
  // -----------------------------
  const getNotes = async () => {
    setLoading(true);
    try {
      const response = await BACKEND_URL.get("/get-notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) getNotes();
  }, [token]); // token change hone par dobara fetch hoga

  // -----------------------------
  // Create Note
  // -----------------------------
  const createNote = async (note) => {
    const res = await BACKEND_URL.post("/create-note", note, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotes([res.data, ...notes]);
  };

  // -----------------------------
  // Update Note
  // -----------------------------
  const updateNote = async (id, updatedNote) => {
    const res = await BACKEND_URL.put(`/update-note/${id}`, updatedNote, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setNotes(notes.map((note) => (note._id === id ? res.data : note)));
  };

  // -----------------------------
  // Delete Note
  // -----------------------------
  const deleteNote = async (id) => {
    await BACKEND_URL.delete(`/delete-note/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setNotes(notes.filter((note) => note._id !== id));
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        createNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
