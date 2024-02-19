import request from "supertest";
import { expect } from "chai";
import { baseUrlKasirAja } from "../Data/configKasirAja.js";
import '../Auth/Login.js';

describe('Transaction', () => {
    let salesID;
    let purchaseID;
    let addSales = {
        "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
        "customerId": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
        "date": "2023-02-01",
        "invoice": "INV001",
        "amount": 2000,
        "discount": 0,
        "description": "Pembelian pertama",
        "items" : [
            {
                "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                "quantity": 1,
                "price": 2000
            }
        ]
     }

     let transaction = {
        "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
        "date": "2023-01-28",
        "invoice": "INV/02/12/2023/001",
        "amount": 14000,
        "discount": 0,
        "description": "testing",
        "items" : [
            {
                "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                "quantity": 4,
                "cost": 1000
            }
        ]
     }


  it('Add sales', async () => {
    const response = await request(baseUrlKasirAja)
    .post('/sales')
    .set('Authorization', `Bearer ${globalToken}`)
    .send(addSales)

    
    expect((await response).status).to.equal(201)
    expect((await response).body.message).to.equal('transaksi ditambahkan')
    expect((await response).body.status).to.equal('success')
    salesID = ((await response).body.data.saleId)
  });

  it('Get sales order data', async () => {
    const response = await request(baseUrlKasirAja)
    .get(`/sales/${salesID}`)
    .set('Authorization', `Bearer ${globalToken}`)

    console.log(((await response).body));
    expect((await response).status).to.equal(200)
  });
  it('Add transaction', async () => {
    const response = await request(baseUrlKasirAja)
    .post(`/purchases`)
    .set('Authorization', `Bearer ${globalToken}`)
    .send(transaction)

    expect((await response).status).to.equal(201)
    expect((await response).body.status).to.equal('success')
    expect((await response).body.message).to.equal('transaksi ditambahkan')

    purchaseID = ((await response).body.data.purchaseId);
  });
  it('Get list of transaction', async () => {
    const response = await request(baseUrlKasirAja)
    .get(`/purchases`)
    .set('Authorization', `Bearer ${globalToken}`)

    expect((await response).body.status).to.equal('success')
    expect((await response).status).to.equal(200)
  });
  it('Get transaction detail', async () => {
    const response = await request(baseUrlKasirAja)
    .get(`/purchases/${purchaseID}`)
    .set('Authorization', `Bearer ${globalToken}`)

    expect((await response).body.status).to.equal('success')
    expect((await response).status).to.equal(200)
  });
})
