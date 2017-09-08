import * as mongoose from "mongoose";

const dbVacancySchema = new mongoose.Schema({
    position: String,
    spec: String,
    location: String,
    minSalary: Number,
    maxSalary: Number,
    contactName: String,
    contactPhone: String,
    contactEmail: String
});

const VacancyModel = mongoose.model('Vacancy', dbVacancySchema);

export default class Vacancy {

    insert = (data) => {
        const obj = new VacancyModel(data);
        return obj.save();
    }

    getAll = () => {
        return VacancyModel.find({});
    }
}
 