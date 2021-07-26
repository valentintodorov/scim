import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';

import {v4 as uuidv4} from 'uuid';
import mongoose from 'mongoose';

import firstUserBody from './user-body';

const auth = 'Basic ' + Buffer.from('admin:password').toString('base64')
let firstUserIdTest = '';
let uniqueId = "_" + uuidv4();

const newGivenName = 'Jose';
const newGivenName2 = 'Paulo';
const newFamilyName2 = 'Faraco';
const displayName2 = 'Babs Jensen 2'

describe('users endpoints', function () {
    let request: supertest.SuperAgentTest;
    before(function () {
        request = supertest.agent(app);
    });
    after(function (done) {
        // shut down the Express.js server, close our MongoDB connection, then tell Mocha we're done:
        app.close(() => {
            mongoose.connection.close(done);
        });
    });

    it('should allow a POST to /users', async function () {
        const res = await request
        .post('/users')
        .set({ Authorization: auth })
        .send(firstUserBody);

        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('string');
        expect(res.body.schemas).to.be.an('array');
        expect(res.body.externalId).to.be.a('string');
        firstUserIdTest = res.body.id;
    });

    it('should allow a GET from /users/:userId', async function () {
        const res = await request
            .get(`/users/${firstUserIdTest}`)
            .set({ Authorization: auth })
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('string');
        expect(res.body.id).to.equal(firstUserIdTest);
        expect(res.body.schemas).to.be.an('array');
        expect(res.body.externalId).to.be.a('string');
        expect(res.body.userName).to.equal(firstUserBody.userName);
    });

    describe('with a valid user', function () {
        it('should allow a GET from /users', async function () {
            const res = await request
                .get(`/users`)
                .set({ Authorization: auth })
                .send();
            expect(res.status).to.equal(200);
            expect(res.body).not.to.be.empty;
            expect(res.body).to.be.an('object');
            expect(res.body.Resources).to.be.an('array');
            expect(res.body.schemas).to.be.an('array');
            expect(res.body.startIndex).to.be.equal(1);
            expect(res.body.totalResults).to.be.an('number');
        });

        it('should allow a PUT to /users/:userId to change first and last names', async function () {
            const res = await request
                .put(`/users/${firstUserIdTest}`)
                .set({ Authorization: auth })
                .send({
                    schemas: firstUserBody.schemas,
                    userName: firstUserBody.userName,
                    externalId: firstUserBody.externalId,
                    displayName: displayName2,
                    // name: { 
                    //     givenName : newGivenName 
                    // }
                });
            expect(res.status).to.equal(200);
            expect(res.body).not.to.be.empty;
            expect(res.body).to.be.an('object');
            expect(res.body.id).to.be.a('string');
            expect(res.body.id).to.equal(firstUserIdTest);
            expect(res.body.schemas).to.be.an('array');
            expect(res.body.externalId).to.equal(firstUserBody.externalId);
            expect(res.body.userName).to.equal(firstUserBody.userName);
            expect(res.body.displayName).to.equal(displayName2);
        });

        it('should allow a GET from /users/:userId and should have a new displayName2', async function () {
            const res = await request
                .get(`/users/${firstUserIdTest}`)
                .set({ Authorization: auth })
                .send();
            expect(res.status).to.equal(200);
            expect(res.body).not.to.be.empty;
            expect(res.body).to.be.an('object');
            expect(res.body.id).to.be.a('string');
            expect(res.body.id).to.equal(firstUserIdTest);
            expect(res.body.displayName).to.equal(displayName2);
        });

        // GET /Users?attributes=userName&startIndex=1&count=100
        it('should allow a GET from /users?attributes=userName', async function () {
            const res = await request
                .get(`/users?attributes=userName&startIndex=1&count=100`)
                .set({ Authorization: auth })
                .send();
            expect(res.status).to.equal(200);
            expect(res.body).not.to.be.empty;
            expect(res.body).to.be.an('object');
        });

    
        // GET /Users?startIndex=1&count=10
        // "totalResults":100,
        // "itemsPerPage":10,
        // "startIndex":1,
        it('should allow a GET from /users?startIndex=1&count=10', async function () {
            const res = await request
                .get(`/users?startIndex=1&count=10`)
                .set({ Authorization: auth })
                .send();
            expect(res.status).to.equal(200);
            expect(res.body).not.to.be.empty;
            expect(res.body).to.be.an('object');
        });

        // GET /Users?filter=userName eq "john"
        // GET /Users?filter=userName eq "bjensen"&attributes=userName
        // GET /Users?filter=userName eq "bjensen"&attributes=ims,locale,name.givenName,externalId,preferredLanguage,userType,id,title,timezone,name.middleName,name.familyName,nickName,name.formatted,meta.location,userName,name.honorificSuffix,meta.version,meta.lastModified,meta.created,name.honorificPrefix,emails,phoneNumbers,photos,x509Certificates.value,profileUrl,roles,active,addresses,displayName,entitlements
        // GET /Users?filter=emails.value eq "bjensen@example.com"&attributes=emails,id,name.givenName
        it('should allow a GET from /users?filter=userName eq "bjensen"', async function () {
            const res = await request
                .get(`/users?filter=userName eq "bjensen"&attributes=userName`)
                .set({ Authorization: auth })
                .send();
            expect(res.status).to.equal(200);
            expect(res.body).not.to.be.empty;
            expect(res.body).to.be.an('object');
        });


        // GET /Users?attributes=userName&excludedAttributes
        // it('should allow a GET from /users/:userId and should have a new displayName2', async function () {
        // }
        

        it('should allow a DELETE from /users/:userId', async function () {
            const res = await request
                .delete(`/users/${firstUserIdTest}`)
                .set({ Authorization: auth })
                .send();
            expect(res.status).to.equal(204);
        });

        // it('should allow a PATCH to /users/:userId', async function () {
        //     const res = await request
        //         .patch(`/users/${firstUserIdTest}`)
        //         .send({
        //             name: {
        //                 firstName: newFirstName,
        //             }
        //         });
        //     expect(res.status).to.equal(204);
        // });


        //     it('should disallow a PUT to /users/:userId trying to change user', async function () {
        //         const res = await request
        //             .put(`/users/${firstUserIdTest}`)
        //             .send({
        //                 userName: firstUserBody.userName,
        //                 externalId: firstUserBody.externalId,
        //                 firstName: 'Marcos',
        //                 lastName: 'Silva',
        //             });
        //         expect(res.status).to.equal(400);
        //         expect(res.body.errors).to.be.an('array');
        //         expect(res.body.errors).to.have.length(1);
        //         expect(res.body.errors[0]).to.equal(
        //             'User cannot change user'
        //         );
        //     });

        it('should allow a POST to /users with a unique userName', async function () {
            firstUserBody.userName += uniqueId;
            const res = await request
            .post('/users')
            .set({ Authorization: auth })
            .send(firstUserBody);
    
            expect(res.status).to.equal(201);
            expect(res.body).not.to.be.empty;
            expect(res.body).to.be.an('object');
            expect(res.body.id).to.be.a('string');
            expect(res.body.schemas).to.be.an('array');
            expect(res.body.externalId).to.be.a('string');
            firstUserIdTest = res.body.id;
        });

        describe('with a invalid user ', function () {
            it('should disallow a PUT to /users/:userId with an nonexistent ID', async function () {
                const res = await request
                    .put(`/users/i-do-not-exist`)
                    .set({ Authorization: auth })
                    .send({
                        schemas: firstUserBody.schemas,
                        userName: firstUserBody.userName,
                        externalId: firstUserBody.externalId,
                        firstName: 'Marcos',
                        lastName: 'Silva',
                    });
                expect(res.status).to.equal(404);
                expect(res.body.status).to.equal(404);
                expect(res.body.schemas).to.be.an('array');
                expect(res.body.detail).to.be.a('string');
            });
         });
    });
});