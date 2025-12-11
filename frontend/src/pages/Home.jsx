import React, { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import Notecard from "../components/Notecard";

export default function Home() {
  const { notes, loading } = useContext(NoteContext);

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-300">
        <p className="text-xl animate-pulse">Loading your notes...</p>
      </div>
    );
  }

  // No Notes Found
  if (notes.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        <p className="text-xl">You have no notes yet. Create one!</p>
      </div>
    );
  }

  // Notes Grid
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {notes.map((note) => (
        <Notecard key={note._id} note={note} />
      ))}
    </div>
  );
}
