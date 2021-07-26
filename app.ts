import express from 'express';
import basicAuth from 'express-basic-auth';
import bodyParser from 'body-parser';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import * as http from 'http';
import debug from 'debug';
import cors from 'cors';

import {CommonRoutesConfig} from './common/common.routes.config';
import {UsersRoutes} from './users/users.routes.config';
import {GroupsRoutes} from './groups/groups.routes.config';
import {DiscoveryRoutes} from './discovery/discovery.routes.config';

import MultitenantMiddleware from './common/middlewares/multitenant.middleware';
import logErrors from './common/middlewares/logErrors';
//import requestLog from './common/middlewares/requestLog';
import ErrorsHandlerMiddleware from './common/middlewares/errorHandler';

import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger/scim-swagger.json';

import dotenv from 'dotenv';
import morgan from 'morgan';


const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(morgan('combined'));

// compress all responses
app.use(compression())

// here we are adding middleware to parse all incoming requests as JSON 
app.use(express.json(
    { 
        limit: "256kb",
        type: ['application/json','application/scim+json']
    }
));
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

// To remove data, use:
//app.use(mongoSanitize());

app.use(MultitenantMiddleware.extractMultitenantId);

//swagger
var options = {
    explorer: true
  };
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use(basicAuth({
    users: { 'admin': 'password' },
    challenge: true,
    realm: 'Imb4T3st4pp',
}))


routes.push(new UsersRoutes(app));
routes.push(new GroupsRoutes(app));
routes.push(new DiscoveryRoutes(app));

// this is a simple route to make sure everything is working properly
app.get('/ping', (req: express.Request, res: express.Response) => {
    const pingMessage = `ping from http://${req.headers.host}:${port}`;
    res.status(200).send(pingMessage)
});

// initialize the logger with the above configuration
app.use(logErrors);
//app.use(requestLog);
app.use(ErrorsHandlerMiddleware.errorHandler);

process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err)
    process.exit(1) //mandatory (as per the Node.js docs)
  });

export default server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    // our only exception to avoiding console.log(), because we
    // always want to know when the server is done starting up
    const runningMessage = `Server running at http://localhost:${port}`;
    console.log(runningMessage);
});