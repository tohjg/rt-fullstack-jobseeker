import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";

import schema from './schema';

const GRAPHQL_ENDPOINT = '/graphql';

const app = express();
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  if (typeof process.env.PRODUCTION !== 'undefined' && process.env.PRODUCTION === 'false') {
    console.log('GraphiQL is enabled @ http://localhost:'+app.get('port')+'/graph-ui');
    app.use('/graph-ui', graphiqlExpress({endpointURL: GRAPHQL_ENDPOINT}))
  }
  app.use(GRAPHQL_ENDPOINT, bodyParser.json(), graphqlExpress({schema: schema}))

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.listen(app.get('port'), () => {
    console.log('API service is listening on port ' + app.get('port'));
  });

});

export { app };
