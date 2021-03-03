import { ObjectId } from 'mongodb';
import mongoose, { Schema, Document, Collection } from 'mongoose';

export interface ClientSearchRequestDto {
    name: string,
    skills: string[];
}

export interface ClientInterface extends Document {
    id: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    country: String,
    skills: String[]
}

const ClientSchema: Schema = new Schema(
    {
        id: { type: String, required: true, unique: true },
        firstName: { type: String, required: false },
        lastName: { type: String, required: false },
        dateOfBirth: { type: Date },
        country: { type: String },
        skills: { type: [String] }
    },
    {
        collection: 'client' // Without this attribute the collection won't be retrieved
    }
);

// model name, schema, ?collection name
const Client = mongoose.model<ClientInterface>('client', ClientSchema);
export default Client;