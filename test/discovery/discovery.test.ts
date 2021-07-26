import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import {v4 as uuidv4} from 'uuid';
import mongoose from 'mongoose';

const auth = 'Basic ' + Buffer.from('admin:password').toString('base64')

describe('discovery endpoints (Service Provider Configuration Endpoints)', function () {
    let request: supertest.SuperAgentTest;
    before(function () {
        request = supertest.agent(app);
    });
    // after(function (done) {
    //     // shut down the Express.js server, close our MongoDB connection, then tell Mocha we're done:
    //     app.close(() => {
    //         mongoose.connection.close(done);
    //     });
    // });

    it('should allow a GET from /serviceproviderconfig', async function () {
        const res = await request
        .get(`/serviceproviderconfig`)
        .set({ Authorization: auth })
        .send();

        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
    });

    it('should allow a GET from /schemas', async function () {
        const res = await request
        .get(`/schemas`)
        .set({ Authorization: auth })
        .send();
        
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
    });

    // it('should allow a GET to /schemas/{id}', async function () {
    // });

    it('should allow a GET from /resourcetypes', async function () {
        const res = await request
        .get(`/resourcetypes`)
        .set({ Authorization: auth })
        .send();
        
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
    });
});