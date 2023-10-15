const { expect } = require("chai");
const { getToken } = require("../auth/token.js");
const request = require("supertest");
const config = require("../../../data/config.json");
const userData = require("../../../data/user/createUser.json");

async function createUser(payload,token) {
    const response = await request(config.baseUrl)
    .post("/users")
    .send(payload)
    .set("Authorization", `Bearer ${token}`)

    return response
}

describe('Create User', () => {
    it('Success create a new user', async () => {
        const token = await getToken()
        const payload = userData
        const response = await createUser(payload, token)

        expect((await response).status).to.equal(201)
        expect((await response).body.data.name).to.equal('TokoWiby')
    })  
})
