import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IPerson extends mongoose.Document {
    // Declare os campos do seu documento aqui
    name: string,
    email: string,
    phone: string,
    address: string,
    document: string
}

const PersonSchema = new Schema({
    // Defina os campos do seu documento aqui
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    document: {
        type: String,
        required: true,
    }
});

export const Person = mongoose.model<IPerson>('Person', PersonSchema);
