// 3rd party libraries
const dynamoose = require('dynamoose');

const peopleSchema = new dynamoose.Schema({
  id: String,
  name: String,
  age: Number,
});

// The first argument MUST match the table name in DynamoDB
// The 2nd argument MUST be a schema
const peopleModel = dynamoose.model('people', peopleSchema)

exports.handler = async (event) => {
  // const { pathParameters, queryStringParameters } = event;
  const { pathParameters } = event;
  const id = pathParameters.id || null;

  // NEVER declare response with const
  let response = { statusCode: null, body: null };
  let peopleRecords = [];
  
  try {
    // perform the CRUD using our specified schema
    if(id){
      // This queries using the id
      peopleRecords = await peopleModel.query('id').eq(id).exec();
    } else {
      // This scans all
      peopleRecords = await peopleModel.scan().exec();
    }
    response.statusCode = 200;
    response.body = JSON.stringify(peopleRecords);
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify(e);
  }

  return response;
};
