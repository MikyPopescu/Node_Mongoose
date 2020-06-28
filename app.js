const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useUnifiedTopology:true, useNewUrlParser:true}); //connection + db_name (looks for it/creates it)

//structure of the data
const fruitSchema = new mongoose.Schema({
      //validation
  name:{
    type:String,
    required: [true, "Please check your data entry, no name specified!"] //not null
  },
  raiting: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

//Relationship
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
})

//collection (converts to plural)
const Fruit = mongoose.model("Fruit", fruitSchema);
const Person = mongoose.model("Person",personSchema);

//document
const apple = new Fruit({
  name: "Apple",
  raiting: 8,
  review: "Great fruit."
});

//save the apple document into a Fruits collection inside the fruitsDB
apple.save(); 

const person = new Person({
  name: "Miky",
  age: 21,
  favouriteFruit: apple
});

person.save();

const mango = new Fruit({
  name: "Mango",
  raiting: 8,
  review: "Refreshing!"
});

mango.save();

Person.updateOne({name:"Miky"},{favouriteFruit:mango},function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Succesfully updated the document!");
  }
})


//insertMany
const kiwi = new Fruit({
  name: "Kiwi",
  raiting: 10,
  review: "The best"
});

const orange = new Fruit({
  name: "Orange",
  raiting: 4,
  review: "Too sour for me"
});

const banana = new Fruit({
  name: "Banana",
  raiting: 3,
  review: "Wired"
});

Fruit.insertMany([kiwi,orange,banana],function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Succesfully saved all fruits!");
  }
});

//READ
//Goes into the Fruits Collection, calls the find method, when completed callback is triggered, if anything goes wrong err, else logs all the results from find
Fruit.find(function(err,fruits){
  if(err){
    console.log(err);
  }
  else{
    fruits.forEach(fruit => {
      console.log(fruit.name);
    });
  //console.log(fruit);
  }
});

//UPDATE
Fruit.updateOne({_id:"5ef86999098f1d4bd4e01271"},{name:"Peach"},function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Succesfully updated the document");
    
  }
});

//DELETE
Fruit.deleteOne({name:"Peach"},function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Succesfully deleted the document");
  }
});

