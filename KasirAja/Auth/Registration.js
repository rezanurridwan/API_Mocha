import request from 'supertest';
import { expect } from 'chai';
import { baseUrlKasirAja } from '../Data/configKasirAja.js';


describe('Registration account', () => {
    const db = 
    {
       "name": "Sumber Makmur Jaya",
       "email": "sample@ex.com",
       "password": "password",
    }
    
  it('regis with data valid', async() => {
    const response = await request (baseUrlKasirAja)
    .post('/registration')
    .send(db)

    expect((await response).status).to.equal(201)
    expect((await response).body.message).to.equal('Toko berhasil didaftarkan')
    console.log((await response).body.data.name)
    console.log((await response).status);
    console.log((await response).body.message);
  });
})
