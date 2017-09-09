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

const VacancyModel = mongoose.model('Vacancy', dbVacancySchema);

export default class Vacancy {

    insert = (data) => {
        const obj = new VacancyModel(data);
        return obj.save();
    }

    getAll = () => {
        return VacancyModel.find({});
    }

    get = (id:string) => {
        return VacancyModel.findById({
            _id: id
        });
    }

    update = (data) => {
        const id = data.id;
        const newChanges = Object.assign({}, data);
        // remove id to prevent override
        delete newChanges.id;

        VacancyModel.findOneAndUpdate({
            _id: data.id
        }, newChanges).then((result) => {
            console.log('data saved', id, newChanges);
            return id;
        }).catch((error) => error);
    }

    delete = (id:string) => {
        return new Promise((resolve, reject) => {
            VacancyModel.remove({_id: id})
                .then(() => {
                    resolve({
                        id: id
                    });
                })
                .catch((error) => reject(error));
        })
    }
}
 