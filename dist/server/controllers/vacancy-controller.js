"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vacancy_1 = require("../models/vacancy");
var Vacancy = (function () {
    function Vacancy() {
        this.insert = function (data) {
            var obj = new vacancy_1.default(data);
            return obj.save();
        };
        this.getAll = function () {
            return vacancy_1.default.find({});
        };
        this.get = function (id) {
            return vacancy_1.default.findById({
                _id: id
            });
        };
        this.update = function (data) {
            var id = data.id;
            var newChanges = Object.assign({}, data);
            // remove id to prevent override
            delete newChanges.id;
            vacancy_1.default.findOneAndUpdate({
                _id: data.id
            }, newChanges).then(function (result) {
                console.log('data saved', id, newChanges);
                return id;
            }).catch(function (error) { return error; });
        };
        this.delete = function (id) {
            return new Promise(function (resolve, reject) {
                vacancy_1.default.remove({ _id: id })
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
//# sourceMappingURL=vacancy-controller.js.map