"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var graphql_server_express_1 = require("graphql-server-express");
var schema_1 = require("./schema");
var GRAPHQL_ENDPOINT = '/graphql';
var app = express();
exports.app = app;
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '../public')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
    if (typeof process.env.PRODUCTION !== 'undefined' && process.env.PRODUCTION === 'false') {
        console.log('GraphiQL is enabled @ http://localhost:' + app.get('port') + '/graph-ui');
        app.use('/graph-ui', graphql_server_express_1.graphiqlExpress({ endpointURL: GRAPHQL_ENDPOINT }));
    }
    app.use(GRAPHQL_ENDPOINT, bodyParser.json(), graphql_server_express_1.graphqlExpress({ schema: schema_1.default }));
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    app.listen(app.get('port'), function () {
        console.log('API service is listening on port ' + app.get('port'));
    });
});
//# sourceMappingURL=app.js.map