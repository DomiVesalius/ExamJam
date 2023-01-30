import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IRandomPerson {
    name: string;
    age: number;
    SIN: number;
}

export interface IRandomPersonModel extends IRandomPerson, Document {}

const RandomPersonSchema: Schema = new Schema(
    {
        name: { type: Schema.Types.String, required: true },
        age: { type: Schema.Types.Number, required: true },
        SIN: { type: Schema.Types.Number, required: true }
    },
    {
        versionKey: false
    }
);

const RandomPersonModel = mongoose.model<IRandomPersonModel>('RandomPerson', RandomPersonSchema);

export default RandomPersonModel;
