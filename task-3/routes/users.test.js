import request from 'supertest'

import app from "../app.js"

describe("GET /users", () => {
    test("should respond with {success: true, payload: an array of users}", async () => {
        await request(app)
            .get('/users')
            .expect(200)
            .expect( (res) => {
                const actualBody = res.body;
                const expectedBody = {success: true, payload: expect.any(Array)};
                expect(actualBody).toStrictEqual(expectedBody);
                
                const expectedPayloadShape = {id: expect.any(Number), 
                                              username: expect.any(String)};
                actualBody.payload.forEach( (actualPayloadObject) => {
                    expect(actualPayloadObject).toStrictEqual(expectedPayloadShape);
                });
            });
    });

    test("?username=some_username should respond with {success: true, payload: an array of users where their usernames are in the req.query}", async () => {
        const name = "James"
        await request(app)
            .get(`/users?username=${name}`)
            .expect(200)
            .expect( (res) => {
                const actualBody = res.body;
                const expectedBody = {success: true, payload: expect.any(Array)};
                expect(actualBody).toStrictEqual(expectedBody);
                
                const expectedPayloadShape = {id: expect.any(Number), 
                                              username: name};
                actualBody.payload.forEach( (actualPayloadObject) => {
                    expect(actualPayloadObject).toStrictEqual(expectedPayloadShape);
                });
            });
    });
});

describe("GET /users/:id", () => {
    test("should respond with {success: true, payload: {id: the id in the req params, username: any string}}", async () => {
        const id = 1;
        await request(app)
            .get(`/users/${id}`)
            .expect(200)
            .expect( (res) => {
                const actual = res.body;
                const expected = {
                    success: true,
                    payload: {id: id, username: expect.any(String)}
                };
                expect(actual).toStrictEqual(expected);
            });
    });

    test("should respond with {success: false, reason: reason: `No user with that ID ${userId} was found!`} if the id doesn't exist", async () => {
        const id = 0;
        await request(app)
            .get(`/users/${id}`)
            .expect(404)
            .expect( (res) => {
                const actual = res.body;
                const expected = {
                    success: false,
                    reason: `No user with that ID ${id} was found!`
                };
                expect(actual).toStrictEqual(expected);
            });
    });
});

describe("POST /users", () => {
    test("should respond with {success: true, payload: {id: any number, username: the username in the req.body}}", async () => {
        const name = "Casey";
        await request(app)
            .post("/users")
            .send({username: name})
            .expect(201)
            .expect( (res) => {
                const actual = res.body;
                const expected = {
                    success: true,
                    payload: {id: expect.any(Number), username: name}
                };
                expect(actual).toStrictEqual(expected);
            });
    });
});

describe("DELETE /users/:id", () => {
    test("should respond with {success: true, payload: {id: the number in the req params, username: any string}}", async () => {
        const id = 1;
        await request(app)
            .delete(`/users/${id}`)
            .expect(200)
            .expect( (res) => {
                const actual = res.body;
                const expected = {
                    success: true,
                    payload: {id: id, username: expect.any(String)}
                };
                expect(actual).toStrictEqual(expected);
            });
    });
});