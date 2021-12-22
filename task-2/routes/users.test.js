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