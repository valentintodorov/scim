import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import {v4 as uuidv4} from 'uuid';
import mongoose from 'mongoose';

import { groupBodies } from './group-body';
import firstUserBody from './..//users/user-body';

const auth = 'Basic ' + Buffer.from('admin:password').toString('base64')
let firstGroupIdTest = '';
let secondGroupIdTest = '';
let thirdGroupIdTest = '';

let firstUserIdTest = '';
let secondUserIdTest = '';

describe('groups endpoints', function () {
    let request: supertest.SuperAgentTest;
    before(function () {
        request = supertest.agent(app);
    });

    // // GET /v2/Groups?filter=displayName sw 'Group'
    // // GET /v2/Groups/e9e30dba-f08f-4109-8486-d5c6a331660a
    it('should allow a POST to /groups', async function () {
        const res = await request
        .post('/groups')
        .set({ Authorization: auth })
        .send(groupBodies.firstGroupBody);
        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('string');
        expect(res.body.schemas).to.be.include('urn:ietf:params:scim:schemas:core:2.0:Group');//.an('array');
        expect(res.body.schemas).to.be.an('array');
        expect(res.body.externalId).to.be.a('string');
        firstGroupIdTest = res.body.id;
    });

    it('should allow a POST to /groups', async function () {
        const res = await request
        .post('/groups')
        .set({ Authorization: auth })
        .send(groupBodies.secondGroupBody);
        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('string');
        expect(res.body.schemas).to.be.include('urn:ietf:params:scim:schemas:core:2.0:Group');//.an('array');
        expect(res.body.schemas).to.be.an('array');
        expect(res.body.externalId).to.be.a('string');
        secondGroupIdTest = res.body.id;
    });

    it('should allow a POST to /groups', async function () {
        const res = await request
        .post('/groups')
        .set({ Authorization: auth })
        .send(groupBodies.thirdGroupBody);
        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('string');
        expect(res.body.schemas).to.be.include('urn:ietf:params:scim:schemas:core:2.0:Group');//.an('array');
        expect(res.body.schemas).to.be.an('array');
        expect(res.body.externalId).to.be.a('string');
        thirdGroupIdTest = res.body.id;
    });

    it('should allow a GET from /groups/:groupId', async function () {
        const res = await request
            .get(`/groups/${firstGroupIdTest}`)
            .set({ Authorization: auth })
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('string');
        expect(res.body.schemas).to.be.include('urn:ietf:params:scim:schemas:core:2.0:Group');//.an('array');
        expect(res.body.schemas).to.be.an('array');
        expect(res.body.externalId).to.be.a('string');
        expect(res.body.displayName).to.equal(groupBodies.firstGroupBody.displayName);
    });

    it('should allow a POST to /users', async function () {
        const res = await request
        .post('/users')
        .set({ Authorization: auth })
        .send({
            schemas: firstUserBody.schemas,
            userName: firstUserBody.userName + '_1_with_group_' + uuidv4(),
            externalId: firstUserBody.externalId + '_1_with_group_' + uuidv4()
        });

        expect(res.status).to.equal(201);
        firstUserIdTest = res.body.id;
    });

    it('should allow a POST to /users', async function () {
        const res = await request
        .post('/users')
        .set({ Authorization: auth })
        .send({
            schemas: firstUserBody.schemas,
            userName: firstUserBody.userName + '_2_with_group_' + uuidv4(),
            externalId: firstUserBody.externalId + '_2_with_group_' + uuidv4()
        });

        expect(res.status).to.equal(201);
        secondUserIdTest = res.body.id;
    });

    it('should allow a PUT to /groups/:groupId to change first and last names', async function () {
        const res = await request
        .put(`/groups/${firstGroupIdTest}`)
        .set({ Authorization: auth })
        .send({
            schemas: groupBodies.firstGroupBody.schemas,
            members: [
                { value: firstUserIdTest, display: '' }, 
                { value: secondUserIdTest, display: '' }
            ],
            externalId: groupBodies.firstGroupBody.externalId,
            displayName: groupBodies.firstGroupBody.displayName,
        });
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('string');
        expect(res.body.id).to.equal(firstGroupIdTest);
        expect(res.body.schemas).to.be.an('array');
    });
});