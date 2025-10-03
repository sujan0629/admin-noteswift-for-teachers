import mongoose, { Schema, models, Model } from 'mongoose';

export interface ITeacher extends mongoose.Document {
  name: string;
  email: string;
  subjects: string[];
  bio?: string;
  qualifications?: string;
  photoUrl?: string;
  earnings?: number;
  createdAt: Date;
  updatedAt: Date;
}

const teacherSchema = new Schema<ITeacher>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subjects: { type: [String], default: [] },
  bio: { type: String },
  qualifications: { type: String },
  photoUrl: { type: String },
  earnings: { type: Number, default: 0 },
}, { timestamps: true });

const Teacher: Model<ITeacher> = models.Teacher || mongoose.model<ITeacher>('Teacher', teacherSchema);

export default Teacher;
