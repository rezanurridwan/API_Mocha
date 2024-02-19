import request from 'supertest'
import {expect} from 'chai';
import {baseUrlKasirAja } from '../KasirAja/Data/configKasirAja.js';
import '../KasirAja/Auth/Login.js'

describe('User', () => { //Module User
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
describe('Customers', () => {//Module Customer
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
describe('Units', () => {//Module Units
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
describe('Product', () => {//Module Product
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
describe('Add Category', () => {//Module Category
    let categoryID;
  
    it('Add category', async () => {
      const categories = {
        "name": "Tanggo Wafer",
        "description": "Wafer Cokelat"
      };
  
      const response = await request(baseUrlKasirAja)
        .post('/categories')
        .set('Authorization', `Bearer ${globalToken}`)
        .send(categories);
  
      expect(response.status).to.equal(201);
      expect(response.body.status).to.equal('success');
      expect(response.body.message).to.equal('Category berhasil ditambahkan');
      categoryID = response.body.data.categoryId;
      expect(response.body.data.name).to.equal(categories.name);
    });
  
    it('Get category list', async () => {
      const response = await request(baseUrlKasirAja)
        .get('/categories')
        .set('Authorization', `Bearer ${globalToken}`);
  
      expect(response.status).to.equal(200);
    });
  
    it('Update category list', async () => {
      const dataupdate = {
        "name": "update-minuman",
        "description": "no-minuman"
      };
      const response = await request(baseUrlKasirAja)
        .put(`/categories/${categoryID}`)
        .set('Authorization', `Bearer ${globalToken}`)
        .send(dataupdate);
  
      console.log((await response).body);
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
      expect(response.body.data.name).to.equal(dataupdate.name);
    });
    it('Delete category list', async () => {
      const response = await request(baseUrlKasirAja)
        .delete(`/categories/${categoryID}`)
        .set('Authorization', `Bearer ${globalToken}`)
      console.log((await response).body);
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal('success');
    });
});
describe('Transaction', () => {//Module Transaction
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

