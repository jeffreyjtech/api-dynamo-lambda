// 3rd party libraries
const dynamoose = require('dynamoose');

const {
  getHandler,
  postHandler,
  putHandler,
  deleteHandler,
} = require('./routes');

const peopleSchema = new dynamoose.Schema({
  id: String,
  name: String,
  age: Number,
});

// The first argument MUST match the table name in DynamoDB
// The 2nd argument MUST be a schema
const peopleModel = dynamoose.model('people', peopleSchema);

exports.handler = async (event) => {
  const { pathParameters, jsonBody, httpMethod  } = event;
  const id = pathParameters.id || null;
  const body = JSON.parse(jsonBody);

  let response = { statusCode: null, body: null };

  switch (httpMethod) {
    case 'GET':
      response = await getHandler(id, response, peopleModel);
      break;
      
    case 'POST':
      response = await postHandler(body, response, peopleModel);
      break;

    case 'PUT':
      response = await putHandler(body, response, peopleModel);
      break;

    case 'DELETE':
      response = await deleteHandler(id, response, peopleModel);
      break;
    
    default:
      response = { statusCode: 404, body: 'Invalid method' };
  }

  return response;
};
