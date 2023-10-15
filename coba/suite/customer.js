const request = require("supertest");
const { expect } = require("chai");

const config = require("../../data/config.json")
const login  = require("../../data/auth/login.json");
const addCustomer = require("../../data/customer/addCustomer.json")
const updateCustomer = require("../../data/customer/updateCustomer.json")

let userId;
let token;

describe('Customer Feature', () => {
    describe('Get Token', () => {
        it('Success Get Token', async () => {
            const response = await request(config.baseUrl)
            .post("/authentications") 
            .send(login.loginSuccess)

            token = (await response).body.data.accessToken
        })  
    }),
    describe('Create Customer', () => {
        it('Success create a new customer', async () => {
            const response = request(config.baseUrl)
            .post("/customers")
            .send(addCustomer.success)
            .set("Authorization", `Bearer ${token}`)

            userId = (await response).body.data.customerId

            expect((await response).status).to.equal(201)
            expect((await response).body.message).to.equal('Customer berhasil ditambahkan')
        }),
        it('Failed create a new customer', async () => {
            const response = request(config.baseUrl)
            .post("/customers")
            .send(addCustomer.failed)
            .set("Authorization", `Bearer ${token}`)

            expect((await response).status).to.equal(400)
            expect((await response).body.status).to.equal('fail')
        })   
    }),
    describe('Get Customer Detail', () => {
        it('Success Get Customer Detail', async () => {
            const response = await request(config.baseUrl)
            .get(`/customers/${userId}`)
            .set("Authorization", `Bearer ${token}`)

            expect((await response).status).to.equal(200)
            expect((await response).body.data.customer.name).to.equal('Wiby Putra')
        }), 
        it('Failed Get User Detail', async () => {
            const response = await request(config.baseUrl)
            .get(`/customers/${userId + "123"}`)
            .set("Authorization", `Bearer ${token}`)

            expect((await response).status).to.equal(404)
            expect((await response).body.message).to.equal('id tidak valid')
        })
    }),
    describe('Update Customer Detail', () => {
        it('Success Update Customer Detail', async () => {
            const response = await request(config.baseUrl)
            .put(`/customers/${userId}`)
            .send(updateCustomer.success)
            .set("Authorization", `Bearer ${token}`)
                
            expect((await response).status).to.equal(200)
            expect((await response).body.data.name).to.equal('Wiby Putra Update')
        })  
        it('Failed Update Customer Detail', async () => {
            const response = await request(config.baseUrl)
            .put(`/customers/${userId}`)
            .send(updateCustomer.failed)
            .set("Authorization", `Bearer ${token}`)

            expect((await response).status).to.equal(400)
            expect((await response).body.message).to.equal('"name" is not allowed to be empty')
        })
    }),
    describe('Delete Customer', () => {
        it('Success Delete Customer', async () => {
            const response = await request(config.baseUrl)
            .delete(`/customers/${userId}`)
            .set("Authorization", `Bearer ${token}`)

            expect((await response).status).to.equal(200)
        }),
        it('Failed Delete Customer', async () => {
            const response = await request(config.baseUrl)
            .delete(`/customers/${userId + "123"}`)
            .set("Authorization", `Bearer ${token}`)

            expect((await response).status).to.equal(404)
        })
    })
})
