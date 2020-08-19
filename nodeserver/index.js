const express = require('express');
const MongoDriver = require('./MongoDriver').MongoDriver;
const Recipe = require("./recipe").Recipe;

var cors = require('cors');
const { response } = require('express');

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



//returns all recipes in the database
app.get('/recipes',(req,res)=>{
    
    res.set({
        'Access-Control-Allow-Origin': 'http://localhost:4201'
    })

    mongo.getAllRecipe().then(promise=>{
        res.send(promise)
    });
})

app.get('/recipe/:name',(req,res)=>{
    var responseObject = {
        status:"",
        data:"",
        message:"",
    }

    if(req.params.name == undefined){
        responseObject.status = false;
        responseObkect.data = null;
        response.message = "No name found in req.params.name at /recipe/:name"
        res.send(responseObject);
    }
    try{

        res.set({
            'Access-Control-Allow-Origin': 'http://localhost:4201'
        })
    
        mongo.getRecipeByName(req.params.name).then(promise=>{
            if(promise === null){
                responseObject.status = false
                responseObject.data = null
                responseObject.message = "Something went wrong in getRecipeByName() in mongoDriver"
            }
            else{
                responseObject.status = true,
                responseObject.data = promise,
            }
            res.send(responseObject)
        });

    }
    catch(e){
        status = false
        data=null
        message=e;
        res.send(responseObject);
    }
})

//Take post request with body definding name:string ingredients:string[]
//use Mongo Driver addRecipe(recipeName:string,ingredients:string[])  returns an observable
// promise is {result:"Success",recipeAdded:recipeName}; on success OR
//            {result:"Fail"} on fail
app.post('/recipe/',(req,res)=>{
   var responseObject = {
       status:"",
       data:"",
       message:"",
   }
    res.set({
        'Access-Control-Allow-Origin': 'http://localhost:4201'
    })
    console.log("Recieved req at /recipe/")
    if(req.body.recipe === undefined){
        responseObject.status = false
        responseObject.data = null
        responseObject.message = "Request not filled. No recipe found"
        res.send(responseObject);
        return;
    }
    if(req.body.ingredients === undefined){
        responseObject.status = false
        responseObject.data = null
        responseObject.message = "Request not filled. No ingredients found"
        res.send(responseObject);
        return;
    }
    //var r = new Recipe(req.body.recipe,req.body.ingredients);
    mongo.addRecipe(req.body.recipe,req.body.ingredients).then((promise)=>{
        responseObject.status = true
        responseObject.data = promise
        responseObject.message = ""
        if(promise === null){
            responseObject.status = false
            responseObject.data = promise
            responseObject.message = ""
            
        }
        res.send(responseObject);
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