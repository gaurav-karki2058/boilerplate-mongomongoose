const mongoose = require('mongoose');

require('dotenv').config();

//connecting to mongo cluster using URI (Uniform Resource Identifier)
mongoose.connect(process.env.MONGO_URI, { dbName: 'FCC',useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully Connected"))
  .catch((err) => console.log("Connection Error: ", err));


// Mongoose schema for database
  var personSchema = new mongoose.Schema({
      name: { type: String, required: true },
      age: Number,
      favoriteFoods:[String]
    });
  
    //Creating model for database entries
  var Person = mongoose.model('Person',personSchema);

  //Creates entries for database
const createAndSavePerson = (done) => { 
  let newPerson=new Person({name:"New Guy",age:22,favoriteFoods:["Fries"]});

  newPerson.save(function(err,data){
    if(err) return console.error(err);
    console.log("1. Added data: \n",data)
    done(null , data);

  })  
  };

  var arrayOfPeople = [
    {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
    {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
    {name: "Robert", age: 78, favoriteFoods: ["wine"]}
  ];
  
  const createManyPeople = function(arrayOfPeople, done) {
    Person.create(arrayOfPeople, function (err, people) {
      if (err) return console.log(err);
      console.log("2. Added People \n",people);
      
      done(null, people);
    });
  };

  
const findPeopleByName = (personName, done) => {
  Person.find(personName,(err,retrievedData)=>{
    if(err) return console.error(err);
    console.log(retrievedData);
    done(null,retrievedData);
  })
};

//Find One uses object as first parameter and a callback function 
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,data)=>{

    if(err) console.error(err);
    console.log("4. Find by one: \n",data);
    done(null , data);
  })
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

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
