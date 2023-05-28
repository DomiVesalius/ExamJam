import mongoose, { Schema, Document } from 'mongoose';

export const SyllabusModelName = 'Syllabus';

export interface ISyllabus {
    courseCode: string;
    session: string;
    meetingSection: string;
    instructor: string;
    originalUrl: string;
    filesId: string;
}

export interface ISyllabusModel extends Document, ISyllabus {}

const SyllabusSchema = new Schema({
    courseCode: { type: Schema.Types.String, required: true, ref: 'Course.courseCode' },
    session: { type: Schema.Types.String, required: true },
    meetingSection: { type: Schema.Types.String, required: true },
    instructor: { type: Schema.Types.String, required: true },
    originalUrl: { type: Schema.Types.String, required: true },
    filesId: { type: Schema.Types.ObjectId, required: false, default: '' }
});

const SyllabusModel = mongoose.model<ISyllabusModel>(SyllabusModelName, SyllabusSchema);

export default SyllabusModel;
