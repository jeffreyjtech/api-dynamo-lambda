'use strict';

async function getHandler(id, response, model) {
  
  // NEVER declare response with const
  let records = [];
  
  try {
    // perform the CRUD using our specified schema
    records = id ?
      await model.query('id').eq(id).exec() : // This queries using the id
      await model.scan().exec(); // This scans all

    response.statusCode = 200;
    response.body = JSON.stringify(records);
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify(e);
  }

  return response;
}

async function postHandler(body, response, model) {
  try {
    let record = await model.create(body);
    response.statusCode = 201;
    response.body = JSON.stringify(record);
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify(e);
  }

  return response;
}

async function putHandler(id, body, response, model) {
  try {
    let record = await model.update(id, body);
    response.statusCode = 204;
    response.body = JSON.stringify(record);
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify(e);
  }
}

async function deleteHandler(id, response, model) {
  try {
    let record = await model.query('id').eq(id).exec();
    await model.delete(id);
    response.statusCode = 200;
    response.body = JSON.stringify(record);
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify(e);
  }
}

module.exports = {
  getHandler,
  postHandler,
  putHandler,
  deleteHandler,
};
