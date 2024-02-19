import request from 'supertest'
import {expect} from  'chai'
import { baseUrlKasirAja } from '../Data/configKasirAja.js'
import '../Auth/Login.js';

describe('Customers', () => {
  let customersID;
  it('add customer', async () => {
    const addCustomers = {
        "name": "Anthony",
        "phone": "081234567890",
        "address": "Bandoeng",
        "description": "Budi anak Pak Edi"
     }
    const response = await request(baseUrlKasirAja)
    .post('/customers')
    .set('Authorization', `Bearer ${globalToken}`)
    .send(addCustomers)

    expect((await response).status).to.equal(201)
    expect((await response).body.status).to.equal('success')
    expect((await response).body.message).to.equal('Customer berhasil ditambahkan')
    customersID = ((await response).body.data.customerId)
    expect((await response).body.data.name).to.equal(addCustomers.name)
    console.log(customersID);
  });
  it('Get customer detail', async () => {
    const response = await request(baseUrlKasirAja)
    .get(`/customers/${customersID}`)
    .set('Authorization', `Bearer ${globalToken}`)

    console.log((await response).body);
    expect((await response).status).to.equal(200)
    expect((await response).body.status).to.equal('success')
  });
  it('Update customer ', async () => {
    let updateCustomer = {
      "name": "Budi Updated",
      "phone": "08987654321",
      "address": "Bandung",
      "description": "Pelanggan VIP"
   }
   
    const response = await request(baseUrlKasirAja)
    .put(`/customers/${customersID}`)
    .set('Authorization', `Bearer ${globalToken}`)
    .send(updateCustomer)

    console.log((await response).body);
    expect((await response).status).to.equal(200)
    expect((await response).body.status).to.equal('success')
  })
  it('Delete customer ', async () => {
    const response = await request(baseUrlKasirAja)
    .delete(`/customers/${customersID}`)
    .set('Authorization', `Bearer ${globalToken}`)

    console.log((await response).body);
    expect((await response).status).to.equal(200)
    expect((await response).body.status).to.equal('success')
  });

})
