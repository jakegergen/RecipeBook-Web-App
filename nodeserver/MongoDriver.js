const MongoClient = require("mongodb").MongoClient;
const Recipe = require("./recipe").Recipe;

var ObjectId = require('mongodb').ObjectID;


const mockData = require('/home/jake/Documents/jkl/nodeserver/test/mockData/data.json');

class MongoDriver{

    constructor(uriSTRING,databaseSTRING,collectionSTRING){
        this.uriString = uriSTRING;
        this.databaseString = databaseSTRING;
        this.collectionString = collectionSTRING;
    }
    //Accpets recipeName:string, ingredients:string[] then create Recipe Object
    //insert recipe Object into mongo database collection
    //returns mongo collection.insertOne() on success
    //returns null on failure
    async addRecipe(recipeName,ingredients){
       if(ingredients == null){
           return null;
       }
       if(recipeName == null){
           return null;
       }

       var recipe = new Recipe(recipeName,ingredients);

       if(recipe.getIngredients().length <= 0){
           return null;
       }

        try{
            const client = new MongoClient(this.uriString);
            
            await client.connect();
            const db = client.db(this.databaseString);
            const recipeCollection = db.collection(this.collectionString);
            
            var status = await recipeCollection.insertOne(recipe);
            client.close();
            return status;
            //console.log(await recipeCollection.find({recipeName:recipeName}).toArray());
        
        }
        catch(e){
            console.error("Failed addRecipe() params: "+recipeName+" "+ingredients+e);
            return null;
        }
        //String recipeName  List<String> ingredients
        //creates connection with mongo database.
        //add {name:'recipeName',ingredients:'ingredients'} to mongoDB
        
    }
    
    async deleteRecipeById(recipeId){
        try{
            const client = new MongoClient(this.uriString);
            
            await client.connect();
            const db = client.db(this.databaseString);
            const recipeCollection = db.collection(this.collectionString);
            var recipeIdAsObject = this.convertIdToObject(recipeId);
            var result = recipeCollection.deleteMany({"_id":recipeIdAsObject});
            client.close();
            return result;
        }
        catch(e){
            console.error(e);
        }
    }
    async deleteRecipeByName(recipeName){
        try{
            const client = new MongoClient(this.uriString);
            
            await client.connect();
            const db = client.db(this.databaseString);
            const recipeCollection = db.collection(this.collectionString);
  
            //console.log(await recipeCollection.find({recipeName:recipeName}).toArray());
          //  console.log(recipeId);
           // var recipeIdAsObject = new ObjectId(recipeId);
            var result = recipeCollection.deleteMany({"recipeName":recipeName});
            client.close();
            return result;
        }
        catch(e){
            console.error(e);
        }
    }

    //Queries mongodb for {recipeName:recipeName}
    //returns data in array format on success. May be empty
    //else returns null
    async getRecipeByName(recipeName){
        try{
            const client = new MongoClient(this.uriString);
            
            await client.connect();
            const db = client.db(this.databaseString);
            const recipeCollection = db.collection(this.collectionString);
  
            //console.log(await recipeCollection.find({recipeName:recipeName}).toArray());
            var result =  recipeCollection.find({recipeName:recipeName}, {$orderby: { _id : -1 }}).toArray();
            client.close();
            return result;
        }
        catch(e){
            console.error("Failed getRecipe() params: "+recipeName+" "+e);
            client.close();
            return null
        }
       
        //string recipeName
        //create mongo connection
        //query for recipeName and return result
    }

    async getRecipeById(recipeId){
        const client = new MongoClient(this.uriString);
            try{
            await client.connect();
            const db = client.db(this.databaseString);
            const recipeCollection = db.collection(this.collectionString);
            var recipeIdAsObject = this.convertIdToObject(recipeId);

            //console.log(await recipeCollection.find({recipeName:recipeName}).toArray());
            var result =  recipeCollection.find({_id:recipeIdAsObject}, {$orderby: { _id : -1 }}).toArray();
            client.close();
            return result;
        }
        catch(e){
            console.error("Failed getRecipe() params: "+recipeName+" "+e);
            client.close();
            return null;

        }
    }
    //returns all recipes in database in array format
    async getAllRecipe(){
        try{
            const client = new MongoClient(this.uriString);
            
            await client.connect();
            const db = client.db(this.databaseString);
            const recipeCollection = db.collection(this.collectionString);
  
            var result = await recipeCollection.find({}).sort({_id:1}).toArray();
            client.close();
            return result;
            
        }
        catch(e){
            console.error("Failed in getAllRecipe():   "+e);
            return null
        }
        client.close();

        //string recipeName
        //create mongo connection
        //query for recipeName and return result
    }

    async dropCollection(){
            const client = new MongoClient(this.uriString);
            
            await client.connect();
            const db = client.db(this.databaseString);
            const recipeCollection = db.collection(this.collectionString);
  
            //console.log(await recipeCollection.find({recipeName:recipeName}).toArray());
            recipeCollection.drop(function(err, delOK) {
                if (err) throw err;
                if (delOK) console.log("Collection deleted");
                
              });
            client.close();
    }
    async addMockData(){
            const client = new MongoClient(this.uriString);
            
            await client.connect();
            const db = client.db(this.databaseString);
            const recipeCollection = db.collection(this.collectionString);

            recipeCollection.insertOne(mockData[0]);
            recipeCollection.insertOne(mockData[1]);
            var result= recipeCollection.insertOne(mockData[2]);
            
            client.close();
            return result;
    }

    convertIdToObject(recipeId){
        let recipeIdAsObject;
        if(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(recipeId)){
            recipeIdAsObject = new ObjectId(recipeId);
         } else {
            recipeIdAsObject = recipeId
         }
         return recipeIdAsObject;
    }
};

module.exports.MongoDriver = MongoDriver;

