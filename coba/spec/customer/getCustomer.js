const { expect } = require("chai");
const { getToken } = require("../auth/token.js");
const request = require("supertest");
const config = require("../../../data/config.json");
const userParams = require("../../../data/customer/getCustomer.json");

async function getCustomer(params, token) {
    const response = await request(config.baseUrl)
    .get(`/customers/${params}`)
    .set("Authorization", `Bearer ${token}`)

    return response
}

module.exports = { getCustomer }

describe('Get Customer Detail', () => {
    it('Success Get Customer Detail', async () => {
        const token = await getToken()
        const response = await getCustomer(userParams.success.params, token)

        expect((await response).status).to.equal(200)
        expect((await response).body.data.customer.name).to.equal('Wiby Putra')
    })  
},
    it('Failed Get User Detail', async () => {
        const token = await getToken() 
        const response = await getCustomer(userParams.failed.params, token)

        expect((await response).status).to.equal(404)
        expect((await response).body.message).to.equal('id tidak valid')
})
)