import mongoose from 'mongoose';
import { IPerson } from './Person';

const Schema = mongoose.Schema;

export interface ICollaborator extends IPerson {
    // Declare os campos do seu documento aqui
    usercode: string;
    password: string;
    role: string;
}

const CollaboratorSchema = new Schema({
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
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    usercode: {
        type: String,
        required: true,
    },

});

export const Collaborator = mongoose.model<ICollaborator>('Collaborator', CollaboratorSchema);
