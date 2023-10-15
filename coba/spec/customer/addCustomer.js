const { expect } = require("chai");
const { getToken } = require("../auth/token.js");
const request = require("supertest");
const config = require("../../../data/config.json");
const customerData = require("../../../data/customer/addCustomer.json")

async function createCustomer(payload,token) {
    const response = await request(config.baseUrl) // ini ke baseUrl
    .post("/customers")
    .send(payload)
    .set("Authorization", `Bearer ${token}`)
    return response
}

module.exports = { createCustomer }

describe('Create Customer', () => {
    it('Success create a new customer', async () => {
        const token = await getToken() // get token
        const payload = customerData.success
        const response = await createCustomer(payload, token)

        expect((await response).status).to.equal(201)
        expect((await response).body.message).to.equal('Customer berhasil ditambahkan')
    }),
    it('Failed create a new customer', async () => {
        const token = await getToken() // get token
        const payload = customerData.failed
        const response = await createCustomer(payload, token)
        
        expect((await response).status).to.equal(400)
        expect((await response).body.status).to.equal('fail')
    })    
})
