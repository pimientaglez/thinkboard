import { Request, Response } from "express";
import Note, { CreateNoteDto, UpdateNoteDto } from "../models/Note.js";

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    console.log("getAllNotes called");
    console.log("Query parameters:", req.query);
    
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`getNote called for id: ${id}`);
    
    const note = await Note.findById(id);
    
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    
    res.json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ error: "Failed to fetch note" });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const noteData: CreateNoteDto = req.body;
    console.log("createNote called with data:", noteData);
    
    const newNote = new Note({
      title: noteData.title,
      content: noteData.content
    });
    
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Failed to create note" });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdateNoteDto = req.body;
    console.log(`updateNote called for id: ${id} with data:`, updateData);
    
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    
    res.json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Failed to update note" });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`deleteNote called for id: ${id}`);
    
    const deletedNote = await Note.findByIdAndDelete(id);
    
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    
    res.json({ message: `Note ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
};