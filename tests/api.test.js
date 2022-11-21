const { describe } = require('mocha');
const request = require('supertest');
const app = require('../index');


describe("Get test tour", () => {
    it('responce with json containing a list of all tours', (done) => {
        request(app)
            .get('/api/tours')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe("GET /tour/:sortId", () => {
    it("responce with json containing a single tour", (done) => {
        request(app)
            .get("/api/tour/TOUR-5802baf4-2764-433c-88d6-1e7c58d7a4d4")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});

describe("Get test concert", () => {
    it('responce with json containing a list of all concert', (done) => {
        request(app)
            .get('/api/concerts')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe("GET /concert/:sortId", () => {
    it("responce with json containing a single concert", (done) => {
        request(app)
            .get("/api/concert/CONCERT-28cdbcd9-488c-41df-a1b3-6b092c72923d")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});