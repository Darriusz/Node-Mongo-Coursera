const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
	assert.equal(err, null);
	console.log('Connected correctly to MongoDB server');

	const db = client.db(dbname); //to connect tothe specified database
	const collection = db.collection('dishes');

	collection.insertOne({"name": "Pizza kapitanska", "description": "bedzie z czasem"},
			(err, result) => {
				assert.equal(err, null);
				console.log('After insert:\n');
				console.log(result.ops);

		collection.find({}).toArray((err, docs) =>{
			assert.equal(err, null);
			console.log('Found:\n');
			console.log(docs);

			db.dropCollection('dishes', (err, result) => {   //removes the collection from db (for the future excercise)
				assert.equal(err, null);
				client.close();
			});
		});
	});
});