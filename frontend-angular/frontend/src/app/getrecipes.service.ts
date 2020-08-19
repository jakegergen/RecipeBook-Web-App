import {HttpClient} from '@angular/common/http';
import {Recipe} from "./recipe"
import { NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@NgModule()
export class GetRecipesService{
    recipes: any[];
    constructor(private http:HttpClient){
       this.http = http;
    }
    getRecipes(){
       return  this.http.get<any[]>('http://localhost:4200/recipes');
    }
    addRecipe(recipeName,recipeIngredients){
      
      var header = new HttpHeaders({
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         'Access-Control-Allow-Origin': 'http://localhost:4200/'
       });
       var httpOptions = {
         headers: header
       };
       
       var recipeAsObj = {
          'recipe': recipeName,
         'ingredients':recipeIngredients
       };
       var res = this.http.post('http://localhost:4200/recipe/',recipeAsObj,httpOptions);
       return res;
      
    }

    deleteRecipe(recipeId){
      
       return this.http.delete('http://localhost:4200/recipe/'+recipeId);
    }
}