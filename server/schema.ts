import { makeExecutableSchema } from 'graphql-tools';
import Vacancy from "./models/Vacancy";
const typeDefs = `
  input TalentRequestForm {
    position: String,
    spec: String,
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
    spec: String,
    location: String,
    minSalary: Int,
    maxSalary: Int,
    contactPerson: String,
    contactEmail: String,
    contactPhone: String
  }
  
  type Query {
    vacancies: [Vacancy]
  }

  type Mutation {
    requestTalentSearch(
      params: TalentRequestForm
    ): Vacancy
  }
`;

const vacancyCtrl = new Vacancy();

const resolvers = {
  Query: {
    vacancies(obj, args, context) {
      console.log('-> request vacancies', obj);
      console.log(args);
      console.log(context);
      return [];
    }
  },
  Mutation: {
    requestTalentSearch(obj, args, context) {
      console.log('requestTalentSearch', args.params);
      return vacancyCtrl.insert(args.params);
    }
  }
}

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});