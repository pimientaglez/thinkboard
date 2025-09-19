import mongoose, { Schema, Document } from "mongoose";

export interface Note extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNoteDto {
  title: string;
  content: string;
}

export interface UpdateNoteDto {
  title?: string;
  content?: string;
}

const noteSchema = new Schema<Note>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<Note>("Note", noteSchema);