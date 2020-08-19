package com.mongodb.quickstart;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;

import com.mongodb.MongoClientSettings;
import com.mongodb.ConnectionString;
import com.mongodb.ServerAddress;
import com.mongodb.MongoCredential;
import com.mongodb.MongoClientOptions;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.Arrays;
import com.mongodb.quickstart.DatabaseManager;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;


public class HelloWorld {
    public static void main(String[] args){

        String uri = "mongodb://localhost:27017";
        String dbname = "myRecipes";
        String collectionName = "myRecipeCollection";

        DatabaseManager dbManager = new DatabaseManager(uri,dbname,collectionName);
        ArrayList<String> ingredients = new ArrayList<String>(Arrays.asList("peanuts","bread","jelly"));


 4
    dbManager.addRecipe("pb&j",ingredients);
        ArrayList<Recipe> foundRecipes = dbManager.getRecipe("pb&j");


        for(Recipe recipe:foundRecipes){
            recipe.print();
        }
        System.out.println("Hello?");
    }
}
