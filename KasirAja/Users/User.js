import request from 'supertest'
import {expect} from 'chai';
import {baseUrlKasirAja } from '../Data/configKasirAja.js';
import '../Auth/Login.js'

describe('Create user', () => {
    const users = {
        "name": "kasir",
        "email": "user@ex.com",
        "password": "jiasda2321@"
     }
     
  it('Create user with data valid', async () => {
    const response = await request(baseUrlKasirAja)
    .post('/users')
    .set('Authorization',`Bearer ${globalToken}`)
    .send(users)

    // console.log(data);
    expect((await response).body.message).to.have.equal("User berhasil ditambahkan")
    expect((await response).status).to.equal(201)
  });
  it('Get user list', async () => {
    const response = await request(baseUrlKasirAja)
    .get('/users')
    .set('Authorization',`Bearer ${globalToken}`)


    // console.log(data);
    expect((await response).status).to.equal(200)
    expect((await response).body.status).to.have.equal("success")
  });
  it('Update user', async () => {
    const updateUser = {
        "name": "update-user",
        "email": "user@example.com"
    }
        
    const response = await request(baseUrlKasirAja)
    .put('/users/576ed8d3-c65c-48bf-bb6b-ad865c18d528')
    .set('Authorization',`Bearer ${globalToken}`)
    .send(updateUser)

    // console.log(data);
    expect((await response).status).to.equal(200)
    expect((await response).body.status).to.have.equal("success")
  });
  it('Delete user', async () => {
        
    const response = await request(baseUrlKasirAja)
    .delete('/users/576ed8d3-c65c-48bf-bb6b-ad865c18d528')
    .set('Authorization',`Bearer ${globalToken}`)

    // console.log(data);
    expect((await response).status).to.equal(200)
    expect((await response).body.status).to.have.equal("success")
  });

})
