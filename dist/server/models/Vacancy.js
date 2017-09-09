"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var dbVacancySchema = new mongoose.Schema({
    position: String,
    skills: Array,
    location: String,
    salaryRange: Array,
    contactName: String,
    contactPhone: String,
    contactEmail: String
});
var VacancyModel = mongoose.model('Vacancy', dbVacancySchema);
var Vacancy = (function () {
    function Vacancy() {
        this.insert = function (data) {
            var obj = new VacancyModel(data);
            return obj.save();
        };
        this.getAll = function () {
            return VacancyModel.find({});
        };
        this.get = function (id) {
            return VacancyModel.findById({
                _id: id
            });
        };
        this.update = function (data) {
            var id = data.id;
            var newChanges = Object.assign({}, data);
            // remove id to prevent override
            delete newChanges.id;
            VacancyModel.findOneAndUpdate({
                _id: data.id
            }, newChanges).then(function (result) {
                console.log('data saved', id, newChanges);
                return id;
            }).catch(function (error) { return error; });
        };
        this.delete = function (id) {
            return new Promise(function (resolve, reject) {
                VacancyModel.remove({ _id: id })
                    .then(function () {
                    resolve({
                        id: id
                    });
                })
                    .catch(function (error) { return reject(error); });
            });
        };
    }
    return Vacancy;
}());
exports.default = Vacancy;
//# sourceMappingURL=Vacancy.js.map