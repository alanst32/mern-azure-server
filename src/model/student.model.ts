import { ObjectId } from 'mongodb';
import mongoose, { Schema, Document, Collection } from 'mongoose';

export interface StudentSearchRequestDto {
    name: string,
    skills: string[];
}

export interface StudentInterface extends Document {
    _id: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    country: String,
    skills: String[],
    inactive: Boolean
}

const StudentSchema: Schema = new Schema(
    {
        _id: { type: String, unique: true },
        firstName: { type: String, required: false },
        lastName: { type: String, required: false },
        dateOfBirth: { type: Date, required: false},
        country: { type: String, required: false },
        skills: { type: [String], required: false },
        inactive: { type: Boolean, default: false }
    },
    {
        collection: 'student' // Without this attribute the collection won't be retrieved
    }
);

// model name, schema, ?collection name
const Student = mongoose.model<StudentInterface>('student', StudentSchema);
export default Student;