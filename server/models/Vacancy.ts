import * as mongoose from "mongoose";

const dbVacancySchema = new mongoose.Schema({
    position: String,
    skills: Array,
    location: String,
    salaryRange: Array,
    contactName: String,
    contactPhone: String,
    contactEmail: String
});

export default mongoose.model('Vacancy', dbVacancySchema);