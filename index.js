const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

//***************instead of the following we have dboper further below*******************

// MongoClient.connect(url, (err, client) => {
// 	assert.equal(err, null);
// 	console.log('Connected correctly to MongoDB server'); 

// 	const db = client.db(dbname); //to connect tothe specified database

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

//***************instead of the following we have promises further below*******************

// MongoClient.connect(url, (err, client) => {
// 	assert.equal(err, null);
// 	console.log('Connected correctly to MongoDB server'); 

// 	const db = client.db(dbname); //to connect tothe specified database

// 	dboper.insertDocument(db, {name: "Pizza kapitanska", description: "bedzie z czasem"},
// 		'dishes', (result) => {
// 			console.log('Insert document:\n', result.ops);

// 			dboper.findDocuments(db, 'dishes', (docs) =>{
// 				console.log('Found docs:\n', docs);

// 				dboper.updateDocument(db, {name: 'Pizza kapitanska'}, 
// 					{description: 'The updated text'}, 'dishes', (result) => {


// 						console.log('updated document:\n', result.result);
// 						dboper.findDocuments(db, 'dishes', (docs) =>{
// 							console.log('Found documents:\n', docs);

// 							db.dropCollection('dishes', (result) =>{
// 								console.log('Dropped Collection: ', result);

// 								client.close();
// 							});
// 						});
// 				});
// 			});

// 	});
// });



MongoClient.connect(url).then ((client) => {

	console.log('Connected correctly to MongoDB server'); 

	const db = client.db(dbname); //to connect tothe specified database

	dboper.insertDocument(db, {name: "Pizza kapitanska", description: "bedzie z czasem"},'dishes')
	.then((result) => {
		console.log('Insert document:\n', result.ops);

		return dboper.findDocuments(db, 'dishes');
	})
	.then((docs) => {
		console.log('Found docs:\n', docs);

		return dboper.updateDocument(db, {name: 'Pizza kapitanska'}, 
			{description: 'The updated text'}, 'dishes');
	})
	.then((result) => {
		console.log('updated document:\n', result.result);

		return dboper.findDocuments(db, 'dishes');
	})
	.then((docs) => {
		console.log('Found documents:\n', docs);

		return db.dropCollection('dishes');
	})
	.then((result) => {
		console.log('Dropped Collection: ', result);

		client.close();
	})
	.catch((err) => console.log(err));
})
.catch((err) => console.log(err));