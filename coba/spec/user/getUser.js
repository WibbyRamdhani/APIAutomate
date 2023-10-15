const { expect } = require("chai");
const request = require("supertest");
const config = require("../../../data/config.json");
const payload  = require("../../../data/user/getUser.json");

async function getUser(payload) {
    const response = await request(config.baseUrl)
    .post("/authentications")
    .send(payload)

    return response
}

describe('Get User', () => {
    it('Success Get User', async () => {
        const response = await getUser(payload.success) 

        expect((await response).status).to.equal(201)
        expect((await response).body.data.user.name).to.equal('TokoWiby')
    })  
},
    it('Failed Get User', async () => {
        const response = await getUser(payload.failed) 

        expect((await response).status).to.equal(401)
})
)