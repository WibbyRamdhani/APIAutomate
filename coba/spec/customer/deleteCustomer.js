const { expect } = require("chai");
const { getToken } = require("../auth/token.js");
const request = require("supertest");
const config = require("../../../data/config.json");
const userParams = require("../../../data/customer/getCustomer.json");

async function deleteCustomer(params, token) {
    const response = await request(config.baseUrl)
    .delete(`/customers/${params}`)
    .set("Authorization", `Bearer ${token}`)

    return response
}

module.exports = { deleteCustomer }

describe('Delete Customer', () => {
    it('Success Delete Customer', async () => {
        const token = await getToken()
        const response = await deleteCustomer(
            userParams.success.params, 
            token)

        expect((await response).status).to.equal(200)
    })  
},
    it('Failed Delete Customer', async () => {
        const token = await getToken()
        const response = await deleteCustomer(
            userParams.failed.params, 
            token) 

        expect((await response).status).to.equal(404)
})
)