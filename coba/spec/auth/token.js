const request = require("supertest");
const config = require("../../../data/config.json");
const userData = require ("../../../data/user/getUser.json");

async function getToken() {
    const response = await request(config.baseUrl) // ini ke baseUrl
    .post("/authentications")
    .send(userData.success)
    const token = await response.body.data.accessToken
    console.log((await token).body)

    return token
}

module.exports = { getToken }

