// import debug from 'debug';

// import * as winston from 'winston';
// import * as expressWinston from 'express-winston';
// import * as MongoDB from 'winston-mongodb';

// const mdb = new MongoDB.MongoDB({
//     db: 'localhost:27017',
//     collection: 'log',
//     level: 'info',
//     storeHost: true,
//     capped: true,
// });

// const logger = winston.createLogger({
//     transports: [
//         new winston.transports.MongoDB({
//             db: 'mongodb://localhost:27017/test',
//             collection: 'log',
//             level: 'info',
//             storeHost: true,
//             capped: true,
//         })
//     ]
// });
// logger.info("Test log!")
// //winston.add(new winston.transports.MongoDB({
// winston.add(new MongoDB.MongoDB({
//     db: 'localhost:27001', //Your Db connection
//     options: {
//       useNewUrlParser: true,
//       poolSize: 2,
//       autoReconnect: true
//     }
//  }));

// const requestLog = expressWinston.logger({
//   transports: [
//     new winston.transports.Console({
//       format: winston.format.json({
//         space: 2
//       })
//     }),
//     //new winston.transports.MongoDB({
//     new MongoDB.MongoDB({
//       db: 'mongodb://localhost:27017', //Your Db connection
//       options: { useUnifiedTopology: true },
//       metaKey: 'meta'
//     //   options: {
//     //     useNewUrlParser: true,
//     //     poolSize: 2,
//     //     autoReconnect: true
//     //   }
//     })
//   ],
// //   meta: true,
// //   msg: "Request: HTTP {{req.method}} {{req.url}}; Username: {{req.user.preferred_username}}; ipAddress {{req.connection.remoteAddress}}",
// //   requestWhitelist: [
// //     "url",
// //     "method",
// //     "httpVersion",
// //     "originalUrl",
// //     "query",
// //     "body"
// //   ]
// });

//export default requestLog;