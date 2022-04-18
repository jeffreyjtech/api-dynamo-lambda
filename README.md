# AWS API with Dynamo and Lambda

A single resource REST API using a "people" model, constructed using AWS Cloud Services

[**Deployed link to my API**](https://m93jyhzd5c.execute-api.us-west-2.amazonaws.com/Dev)

## UML Diagram

![My UML diagram]

## Authors/Contributors

- Jeffrey Jenkins

## Routes

### `/people` CRUD

- POST : `/people`
  - Requires a JSON body containing `id`, `age`, and `name` props.
  - Response
    - Status `201`, and a JSON body which is the `people` record created in the database.

- GET : `/people[/:id]`
  - Optionally include an id to GET a specific record
  - Response
    - Status `200`, and a JSON body which contains all people in the database, or the record specified by the `id` param.
- PUT : `/people/:id`
  - Requires a JSON body containing the data to update in the target record.
  - Requires an `id` param.
  - Response
    - Status `204`, and a JSON body which is the `people` record updated in the database.

- DELETE : `/people/:id`
  - Requires an `id` param
  - Response
    - Status `200`, and a JSON body which is the `people` record removed from the database.

## Schema

```js
{
  id: String,
  name: String,
  age: Number,
}
```
<!-- # S3 and Lambda

An AWS Lambda function for storing an image's metadata to S3. When an .jpg image is uploaded to a hooked-up S3 bucket, this Lambda function will add metadata about the image to a manifest file called `images.json`. If an image with the same filename as a previous/existing image is uploaded, the manifest data will be updated in place.

Since the image metadata was never meant to store duplicates and it had to be stored as JSON (serializable data only), I decided to forgo the instructions to use an object array and instead I used an object-containing-objects. This resulted in cleaner code. It does not need conditional logic to add or update an entry, instead combining the spread operator and object literal behavior to do so.

## [**Link to `images.json` on S3**](https://jjtech-images.s3.us-west-2.amazonaws.com/images.json)

## UML Diagram

![My S3 and Lambda Diagram](lab-16-uml.jpg)

## Authors/Contributors

- Jeffrey Jenkins

## Credits/References

- I used these resources to learn how to put objects into to S3
  - [StackOverflow thread](https://stackoverflow.com/questions/40188287/aws-lambda-function-write-to-s3)
  - [Medium article](https://medium.com/swlh/upload-to-aws-s3-using-a-node-js-script-or-aws-lambda-e1877960bcea)

## Manifest Format

The `images.json` stores the image metadata in the following format (when processed with `JSON.parse()`):

```js
{
  'mountains.jpg': { // image record key, which is the same as the filename
    imageKey: 'mountains.jpg', // filename
    imageSize: '300000', // image size in bytes
    imageLastUpdated: '1970-01-01T00:00:00.000Z', // ISO 8601 timestamp
  },
  'lakes.jpg': { 
    imageKey: 'lakes.jpg',
    imageSize: '450000',
    imageLastUpdated: '1971-01-01T00:00:00.000Z',
  },
}
```
 -->