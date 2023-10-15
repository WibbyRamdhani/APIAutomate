const { expect } = require("chai");
const request = require("supertest");
const config = require("../../../data/config.json");
const payload  = require("../../../data/auth/login.json");

async function login(payload) {
    const response = await request(config.baseUrl) // ini ke baseUrl
    .post("/authentications")
    .send(payload)

    return response
}

describe('Login Feature', () => {
    it('Success Login', async () => {
        const response = await login(payload.loginSuccess)

        expect((await response).status).to.equal(201)
        expect((await response).body.data.user.name).to.equal('TokoWiby')
    })  
},
    it('Failed Login', async () => {
        const response = await login(payload.loginFailed)

        expect((await response).status).to.equal(401)
    })
)