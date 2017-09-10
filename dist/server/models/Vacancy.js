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
exports.default = mongoose.model('Vacancy', dbVacancySchema);
//# sourceMappingURL=vacancy.js.map