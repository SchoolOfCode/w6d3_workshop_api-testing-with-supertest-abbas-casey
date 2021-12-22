// Write your tests for task 2 in this file. Plan out what you need to import/require.
import request from "supertest";
import app from "../app.js";

describe("async function", () => {
    it("should send req to /Users", async() => {
        await request(app)
            .get("/users")
            .expect(200)
            .expect((res) => {
                const expected = { success: true, payload: expect.any(Array) };

                const actual = res.body;
                expect(actual).toStrictEqual(expected);
            })
            .expect((res) => {
                const actual = res.body.payload;
                const expected = expect.arrayContaining([{
                    id: expect.any(Number),
                    username: expect.any(String),
                }, ]);

                expect(actual).toStrictEqual(expected);
            });
    });
});

describe("GET /users/4", () => {
    it("should give a response with the correct payload structure", async() => {
        await request(app)
            .get("/users/4")
            .expect(200)
            .expect((res) => {
                const expected = {
                    success: true,
                    payload: { id: 4, username: expect.any(String) },
                };
                const actual = res.body;
                expect(actual).toStrictEqual(expected);
            });
    });
});

describe("getting error code 404?", () => {
    it("should pass with error 404", async() => {
        await request(app)
            .get("/users/99")
            .expect(404)
            .expect((res) => {
                const actual = res.body;
                const expected = {
                    success: false,
                    reason: "No user with ID 99 was found.",
                };

                expect(actual).toStrictEqual(expected);
            });
    });
});