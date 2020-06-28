const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useUnifiedTopology:true, useNewUrlParser:true}); //connection + db_name (looks for it/creates it)

//structure of the data
const fruitSchema = new mongoose.Schema({
  name: String,
  raiting: Number,
  review: String
});

//collection (converts to plural)
const Fruit = mongoose.model("Fruit", fruitSchema);

//document
const apple = new Fruit({
  name: "Apple",
  raiting: 8,
  review: "Great fruit."
});

//save the apple document into a Fruits collection inside the fruitsDB
apple.save(); 

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


