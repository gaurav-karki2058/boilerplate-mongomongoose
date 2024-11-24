const mongoose = require('mongoose');
require('dotenv').config();

// Connecting to the MongoDB database using the URI stored in environment variables
mongoose.connect(process.env.MONGO_URI, { dbName: 'FCC', useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully Connected"))  // Log success if connected
  .catch((err) => console.log("Connection Error: ", err));  // Log error if connection fails


// Define the schema (structure) for the 'Person' collection in the database
var personSchema = new mongoose.Schema({
  name: { type: String, required: true },  // 'name' must be a string and is required
  age: Number,                            // 'age' is a number (optional)
  favoriteFoods: [String]                 // 'favoriteFoods' is an array of strings (optional)
});

// Create a model based on the schema to interact with the database
var Person = mongoose.model('Person', personSchema);


// Function to create and save a new 'Person' to the database
const createAndSavePerson = (done) => { 
  let newPerson = new Person({ name: "New Guy", age: 22, favoriteFoods: ["Fries"] });

  // Save the person to the database
  newPerson.save(function (err, data) {
    if (err) return console.error(err);  // If there's an error, log it
    console.log("1. Added data: \n", data);  // Log the added data
    done(null, data);  // Call the callback with the saved data
  });  
};


// Function to create and save multiple people at once
const createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);  // If there's an error, log it
    console.log("2. Added People \n", people);  // Log the added people
    done(null, people);  // Call the callback with the added people
  });
};

// Function to find people by their name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, retrievedData) => {
    if (err) return console.error(err);  // Log error if any
    console.log(retrievedData);  // Log the retrieved data (matching people)
    done(null, retrievedData);  // Call the callback with the retrieved data
  });
};

// Function to find one person by a specific food in their favoriteFoods array
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) console.error(err);  // Log error if any
    console.log("4. Find by one: \n", data);  // Log the person found
    done(null, data);  // Call the callback with the found person
  });
};

// Function to find a person by their unique ID (MongoDB assigns this ID)
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.err(err);  // Log error if any
    done(null, data);  // Call the callback with the found person
  });
};

// Function to add a food item to a person's 'favoriteFoods' and save the updated data
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';  // Food we want to add

  // Find the person by their unique ID
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);  // Log error if any

    // Add 'hamburger' to the person's favoriteFoods array
    person.favoriteFoods.push(foodToAdd);

    // Save the updated person to the database
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);  // Log error if any
      done(null, updatedPerson);  // Call the callback with the updated person
    });
  });
};

// Function to find a person by their name and update their age
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;  // New age value

  // Find a person by their name and update their age
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, data) => {
    if (err) return console.error(err);  // Log error if any
    done(err, data);  // Call the callback with the updated data
  });
};

// Function to remove a person from the database by their ID
const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, (err, data) => {
    if (err) return console.error(err);  // Log error if any
    done(null, data);  // Call the callback with the deleted person's data
  });
};

// Function to remove multiple people with the name "Mary"
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";  // Name we want to remove

  // Remove people with the name "Mary"
  Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) return console.error(err);  // Log error if any
    console.log(response);  // Log the response (number of people removed)
    done(null, response);  // Call the callback with the response
  });
};

// Function to query people who like a specific food, sort by name, limit results, and exclude age field
const queryChain = (done) => {
  const foodToSearch = "burrito";  // Food we want to search for

  // Query people with "burrito" in their favoriteFoods, then sort by name, limit results to 2, and exclude age
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })  // Sort results by name in ascending order
    .limit(2)           // Limit results to 2
    .select({ age: 0 }) // Exclude the 'age' field from the results
    .exec((err, res) => {
      if (err) return console.error(err);  // Log error if any
      done(null, res);  // Call the callback with the query results
    });
};

/** **Well Done !!**
/* You've completed these challenges, great job!
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

// Export the model and functions for use in other parts of the app
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
