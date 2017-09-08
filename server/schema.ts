import { makeExecutableSchema } from 'graphql-tools';
import Vacancy from "./models/Vacancy";
const typeDefs = `
  input TalentRequestForm {
    id: ID,
    position: String,
    skills: [String],
    location: String,
    minSalary: Int,
    maxSalary: Int,
    contactName: String,
    contactPhone: String,
    contactEmail: String
  }

  type Vacancy {
    id: ID!,
    position: String,
    skills: [String],
    location: String,
    minSalary: Int,
    maxSalary: Int,
    contactName: String,
    contactEmail: String,
    contactPhone: String
  }
  
  type Query {
    vacancies: [Vacancy],
    vacancy(
      id: ID
    ): Vacancy
  }

  type RemovalTalentPayload {
    id: ID
  }

  type Mutation {
    requestTalentSearch(
      params: TalentRequestForm
    ): Vacancy

    removeTalentSearch(
      id: ID
    ): RemovalTalentPayload
  }
`;

const vacancyCtrl = new Vacancy();

const resolvers = {
  Query: {
    vacancies(obj, args, context) {
      return vacancyCtrl.getAll();
    },
    vacancy(obj, args, context) {
      return vacancyCtrl.get(args.id);
    }
  },
  Mutation: {
    requestTalentSearch(obj, args, context) {
      if (args.params.id != undefined) {
        // update
        return vacancyCtrl.update(args.params);
      }

      // create new entry
      return vacancyCtrl.insert(args.params);
    },
    removeTalentSearch(obj, args, context) {
      return vacancyCtrl.delete(args.id);
    }
  }
}

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});