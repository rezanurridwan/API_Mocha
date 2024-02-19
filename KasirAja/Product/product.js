import request from "supertest";
import { expect } from "chai";
import { baseUrlKasirAja } from "../Data/configKasirAja.js";
import '../Auth/Login.js';

describe('Product', () => {
    let productID;
    let addProduct = {
        "category_id" : '681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d',
        "code": "A314ASDDFIER3432",
        "name": "taro",
        "price": "3500",
        "cost": "3000",
        "stock": "5"
     }
    let updateProduct = {
        "category_id" : "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
        "code": "A314ASDDFIER3432",
        "name": "taroUpdate",
        "price": "3500",
        "cost": "3000",
        "stock": "1"
     }     
  it('Add product', async() => {
    const response = await request(baseUrlKasirAja)
    .post('/products')
    .set('Authorization', `Bearer ${globalToken}`)
    .send(addProduct)

     productID = ((await response).body.data.productId)
     expect((await response).status).to.equal(201)
     expect((await response).body.status).to.equal('success')
     expect((await response).body.message).to.equal('Product berhasil ditambahkan')
    console.log((await response).body);
  });
  it('Get product Detail', async() => {
    const response = await request(baseUrlKasirAja)
    .get(`/products/${productID}`)
    .set('Authorization', `Bearer ${globalToken}`)

    expect((await response).status).to.equal(200)
    expect((await response).body.status).to.equal('success')
    expect((await response).body.data.product.name).to.equal(addProduct.name)
    console.log((await response).body);
  });
  it('Update product', async() => {
    const response = await request(baseUrlKasirAja)
    .put(`/products/${productID}`)
    .set('Authorization', `Bearer ${globalToken}`)
    .send(updateProduct)

    expect((await response).status).to.equal(200)
    expect((await response).body.status).to.equal('success')
    expect((await response).body.message).to.equal('Product berhasil diupdate')
    expect((await response).body.data.name).to.equal(updateProduct.name)
    console.log((await response).body.data.name);
  });
  it('Delete product', async() => {
    const response = await request(baseUrlKasirAja)
    .delete(`/products/${productID}`)
    .set('Authorization', `Bearer ${globalToken}`)

    expect((await response).status).to.equal(200)
    expect((await response).body.status).to.equal('success')
    expect((await response).body.message).to.equal('Product berhasil dihapus')
  });

})
