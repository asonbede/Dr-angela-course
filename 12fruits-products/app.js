const mongoose = require("mongoose");

//connect to the database
mongoose.connect("mongodb://localhost:27017/fruitsDB",{ useNewUrlParser: true ,useUnifiedTopology: true} )
//create a collection/table blueprint

const personsSchema= new mongoose.Schema({
    name:String,
    age:Number
})
const fruitsSchema= new mongoose.Schema({
    name :{
        type:String,
        required:[true,"please check your data entry,no name specified"]
    },
    rating:{
       type: Number,
     max:20,
     min:1   
    },
    review:String
})



//create a model with the schema
const Person = mongoose.model ("Person",personsSchema)
const Fruit = mongoose.model("Fruit",fruitsSchema)

//----------------creating saving to the database---------------------
//create the document
const person= new Person({
    name:"Biden",
    age: 76
})
const fruit= new Fruit({
    name:"Cashew",
    rating:10,
    review:"A very sweet fruit"
})
//insert bulk documents into collections
// const kiwi= new Fruit({
//     name:"Kiwi",
//     rating:10,
//     review:"The best fruit ever"
// })

// const banana= new Fruit({
//     name:"banana",
//     rating:3,
//     review:"Theweired fruit"
// })

// const orange= new Fruit({
//     name:"orange",
//     rating:2,
//     review:"soure fruit"
// })

// Fruit.insertMany([kiwi,orange,banana],function (err) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("successfully inserted fruits")
//     }
// })

//fruit.save()
//mongoose.connection.close()


//person.save()



//-------------------Reading from the database----------------

Person.find((err,result)=>{
    if (err) {
        console.log(err)
    } else {
        mongoose.connection.close();
        console.log(result)
        
    }
})

//printing only the names of the fruits

// Fruit.find((err,result)=>{
//     if (err) {
//         console.log(err)
//     } else {
//         mongoose.connection.close();
//         result.forEach(item=>console.log( item))
        
        
//     }
// })

// -------------------updating data---------------
// Fruit.updateOne({_id: "5fd8fcdaff8a52160ca756ff"},{name:"Lemon"},(err)=>{
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("successfully updated")
        
//     }
// })

//------------delete operations------------------------
// Fruit.deleteOne({name:"Cashew"},(err)=>{
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("successfully deleted the document")
//     }

// })
// Person.deleteMany({name:"Biden"},(err)=>{
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("successfully deleted all the documents")
        
//     }
// })


