import request from 'supertest';
import { expect } from 'chai';
import { baseUrlKasirAja } from '../Data/configKasirAja.js';

 global.globalToken="";
describe('Login account', () => {
  
    const db = 
    {
       "email": "sample@ex.com",
       "password": "123adsfadf@"
    }
    
  it('login with data valid', async() => {
    const response = await request (baseUrlKasirAja)
    .post('/authentications')
    .send(db)

    expect((await response).status).to.equal(201)
    expect((await response).body.message).to.equal('Authentication berhasil ditambahkan')
    

      globalToken = ((await response).body.data.accessToken)

  });

  // const getToken = () =>{
  //   return globalToken;
  // }
  //  getToken = getToken;
  console.log(globalToken);
})
