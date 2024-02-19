import request from "supertest"
import { expect } from "chai"
import { baseUrlKasirAja } from "../Data/configKasirAja.js"
import '../Auth/Login.js'

describe('Units', () => {
  it('Add unit', async() => {
    const unit = {  
        "name": "kilogram",
        "description": "heavy measurement"}
    const response = await request(baseUrlKasirAja)
    .post('/units')
    .set('Authorization', `Bearer ${globalToken}`)
    .send(unit)

    expect((await response).status).to.equal(201)
    expect((await response).body.message).to.equal('Unit berhasil ditambahkan')
  });
  it('Get unit list', async() => {
    const response = await request(baseUrlKasirAja)
    .get('/units')
    .set('Authorization', `Bearer ${globalToken}`)

    expect((await response).status).to.equal(200)
  });
  it('Update unit', async() => {
    const unit = {  
        "name": "update-saya",
        "description": "sudah terupdate"}
    const response = await request(baseUrlKasirAja)
    .put('/units/8e950241-a6f3-42bb-9710-4636712fd847')
    .set('Authorization', `Bearer ${globalToken}`)
    .send(unit)

    expect((await response).status).to.equal(200)
    expect((await response).body.status).to.equal('success')
  });
  it('Delete unit', async() => {
    const response = await request(baseUrlKasirAja)
    .delete('/units/811f547e-a24e-4f94-bfe1-b7ed7d11c03f')
    .set('Authorization', `Bearer ${globalToken}`)
    expect((await response).status).to.equal(200)
  });
})
