import request from "supertest";
import { expect } from "chai";
import { baseUrlKasirAja } from "../Data/configKasirAja.js";
import '../Auth/Login.js';

describe('Add Category', () => {
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
