package com.mongodb.quickstart;

import java.util.List;

public class Recipe {
    public Recipe(String RECIPEname, List<String> RECIPEingredients){
        name = RECIPEname;
        ingredients = RECIPEingredients;
    }
    public void print(){
        System.out.println("Name: "+name+"\nIngredients: "+ingredients);
    }
    public String name;
    public List<String> ingredients;
}
