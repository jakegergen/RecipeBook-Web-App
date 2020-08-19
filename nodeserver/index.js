const express = require('express');
const MongoDriver = require('./MongoDriver').MongoDriver;
const Recipe = require("./recipe").Recipe;

var cors = require('cors');

var uri = "mongodb://localhost:27017";
var dbname = "myRecipes";
var collectionName = "myRecipeCollection";


const mongo = new MongoDriver(uri,dbname,collectionName);
//mongo.deleteRecipe("pb&j")
//mongo.addRecipe("pb&j",["peanut butter","jelly","bread"]);
//mongo.getRecipe("pb&j").then(promise=>console.log(promise));
//console.log(mongo.getRecipe("pb&j"));
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded




app.get('/recipes',(req,res)=>{
    
    res.set({
        'Access-Control-Allow-Origin': 'http://localhost:4201'
    })

    mongo.getAllRecipe().then(promise=>{
        res.send(promise)
    });
})

app.get('/recipe/:name',(req,res)=>{

    try{
        console.log("Get: /recipe/:name")
   console.log(req.params);

   res.set({
    'Access-Control-Allow-Origin': 'http://localhost:4201'
    })
   
    mongo.getRecipeByName(req.params.name).then(promise=>{
        res.send(promise)
    });

    }
    catch(e){
        res.send(e);
    }
})

//Take post request with body definding name:string ingredients:string[]
//use Mongo Driver addRecipe(recipeName:string,ingredients:string[])  returns an observable
// promise is {result:"Success",recipeAdded:recipeName}; on success OR
//            {result:"Fail"} on fail
app.post('/recipe/',(req,res)=>{
   
    res.set({
        'Access-Control-Allow-Origin': 'http://localhost:4201'
    })
    console.log("Recieved req at /recipe/")
    if(req.body.recipe === undefined){
        res.send("Request not filled. No recipe found");
    }
    if(req.body.ingredients === undefined){
        res.send("Request not filled. No ingredients found");
    }
    //var r = new Recipe(req.body.recipe,req.body.ingredients);
    mongo.addRecipe(req.body.recipe,req.body.ingredients).then((promise)=>{
        res.send(promise);
    })
})

app.delete('/recipe/:_id',(req,res)=>{

    res.set({
        'Access-Control-Allow-Origin': 'http://localhost:4201'
    })

    console.log("delete request recieved at /recipe/")
    if(req.params._id === undefined){
        res.send("Request not filled. No recipe ID found in body");
        return;
    }
    console.log("req.body.recipe = " + req.params._id );
    mongo.deleteRecipe(req.params._id).then((promise)=>{
        res.send(promise);
    })
})


app.listen(4200,()=>console.log('listening on 4200' ));