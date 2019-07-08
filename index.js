const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
	assert.equal(err, null);
	console.log('Connected correctly to MongoDB server'); 

	const db = client.db(dbname); //to connect tothe specified database

	// const collection = db.collection('dishes'); //dboper instead

	// collection.insertOne({"name": "Pizza kapitanska", "description": "bedzie z czasem"},
	// 		(err, result) => {
	// 			assert.equal(err, null);
	// 			console.log('After insert:\n');
	// 			console.log(result.ops);

	// 	collection.find({}).toArray((err, docs) =>{
	// 		assert.equal(err, null);
	// 		console.log('Found:\n');
	// 		console.log(docs);

	// 		db.dropCollection('dishes', (err, result) => {   //removes the collection from db (for the future excercise)
	// 			assert.equal(err, null);
	// 			client.close();
	// 		});
	// 	});
	// });

	dboper.insertDocument(db, {name: "Pizza kapitanska", description: "bedzie z czasem"},
		'dishes', (result) => {
			console.log('Insert document:\n', result.ops);

			dboper.findDocuments(db, 'dishes', (docs) =>{
				console.log('Found docs:\n', docs);

				dboper.updateDocument(db, {name: 'Pizza kapitanska'}, 
					{description: 'The updated text'}, 'dishes', (result) => {


						console.log('updated document:\n', result.result);
						dboper.findDocuments(db, 'dishes', (docs) =>{
							console.log('Found documents:\n', docs);

							db.dropCollection('dishes', (result) =>{
								console.log('Dropped Collection: ', result);

								client.close();
							});
						});
				});
			});

	});
});