"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tools_1 = require("graphql-tools");
var Vacancy_1 = require("./models/Vacancy");
var typeDefs = "\n  input TalentRequestForm {\n    id: ID,\n    position: String,\n    skills: [String],\n    location: String,\n    salaryRange: [Int],\n    contactName: String,\n    contactPhone: String,\n    contactEmail: String\n  }\n\n  type Vacancy {\n    id: ID!,\n    position: String,\n    skills: [String],\n    location: String,\n    salaryRange: [Int],\n    contactName: String,\n    contactEmail: String,\n    contactPhone: String\n  }\n  \n  type Query {\n    vacancies: [Vacancy],\n    vacancy(\n      id: ID\n    ): Vacancy\n  }\n\n  type RemovalTalentPayload {\n    id: ID\n  }\n\n  type Mutation {\n    requestTalentSearch(\n      params: TalentRequestForm\n    ): Vacancy\n\n    removeTalentSearch(\n      id: ID\n    ): RemovalTalentPayload\n  }\n";
var vacancyCtrl = new Vacancy_1.default();
var resolvers = {
    Query: {
        vacancies: function (obj, args, context) {
            return vacancyCtrl.getAll();
        },
        vacancy: function (obj, args, context) {
            return vacancyCtrl.get(args.id);
        }
    },
    Mutation: {
        requestTalentSearch: function (obj, args, context) {
            if (args.params.id != undefined) {
                // update
                return vacancyCtrl.update(args.params);
            }
            // create new entry
            return vacancyCtrl.insert(args.params);
        },
        removeTalentSearch: function (obj, args, context) {
            return vacancyCtrl.delete(args.id);
        }
    }
};
exports.default = graphql_tools_1.makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
});
//# sourceMappingURL=schema.js.map