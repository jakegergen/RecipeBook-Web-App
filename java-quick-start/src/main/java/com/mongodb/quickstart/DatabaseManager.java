package com.mongodb.quickstart;


import com.mongodb.ConnectionString;
import com.mongodb.MongoClientOptions;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.*;
import com.mongodb.client.MongoClient;
import com.mongodb.connection.ClusterSettings;
import org.bson.Document;
import com.mongodb.MongoException.*;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.*;

public class DatabaseManager {
    String COLLECTIONstring;
    String URIstring;
    String DATABASEstring;

    public DatabaseManager(String uri,String Database, String Collection){
        URIstring = uri;
        DATABASEstring = Database;
        COLLECTIONstring = Collection;
        //MongoClientOptions options = new MongoClientOptions.Builder().socketKeepAlive(true).build();
        //MongoClient client = MongoClients.create(new ConnectionString(uri+"/?maxIdleTimeMS=9999999"));
    }

    public void addRecipe(String recipeName, List<String> ingredients){
        MongoClient mongoClient = getClient();
        MongoDatabase mongoDB = getDatabase(mongoClient);
        MongoCollection mongoCollection = getCollection(mongoDB);
        Document document = new Document("name",recipeName).append("ingredients",ingredients);
        try{
            mongoCollection.insertOne(document);
            System.out.println("Success!");
            return;
        } catch(Exception writeError){
            System.out.println(writeError);
            return;
        }
    }
    public ArrayList<Recipe> getRecipe(String recipeName){
        MongoClient mongoClient = getClient();
        MongoDatabase mongoDB = getDatabase(mongoClient);
        MongoCollection mongoCollection = getCollection(mongoDB);
        FindIterable<Document> docs = mongoCollection.find(eq("name",recipeName));
        ArrayList<Recipe> recipesFound = new ArrayList<Recipe>();
       for(Document doc:docs){
           Recipe recipe = new Recipe((String)doc.get("name"),(ArrayList)doc.get("ingredients"));
           recipesFound.add(recipe);
       }
        return recipesFound;
    }

    private MongoClient getClient(){
        MongoClientOptions options = new MongoClientOptions.Builder().socketKeepAlive(true).build();
        MongoClient client = MongoClients.create(new ConnectionString(URIstring+"/?maxIdleTimeMS=9999999"));
        return client;
    }
    private MongoDatabase getDatabase(MongoClient myClient){
        return myClient.getDatabase(DATABASEstring);
    }
    private MongoCollection getCollection(MongoDatabase myDB){
        return myDB.getCollection(COLLECTIONstring);
    }


}
