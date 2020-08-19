import {Component, SystemJsNgModuleLoader} from '@angular/core';
import {GetRecipesService} from './getrecipes.service'
import { TagInputModule } from 'ngx-chips';
TagInputModule.withDefaults({
    tagInput: {
        placeholder: 'Add a ag',
        // add here other default values for tag-input
    },
    dropdown: {
        displayBy: 'my-display-value',
        // add here other default values for tag-input-dropdown
    }
});



@Component({
    selector: 'recipes', //<recipes>
    template: `

    

    <script src="angular.min.js"></script>
    <script src="ng-tags-input.min.js"></script>
       

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                <form>
                <div class="form-group">
                    <label for="recipeNameInput1">Recipe Name</label>
                    <input [(ngModel)] ="formRecipeName" name="formRecipeName" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                   
                   
                    <tag-input [(ngModel)]="formIngredients" id="ingredientTags" [modelAsStrings]="true" name="formIngredients" [secondaryPlaceholder]="'Enter Ingredient'"> </tag-input>
                    
                    </div>
               
                <button type="submit" class="btn btn-primary" (click)="addRecipe()" data-dismiss="modal">Submit</button>
               
                </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    


                
                    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                        <a class="navbar-brand" href="#">Fixed navbar</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarCollapse">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" data-toggle="modal" data-target="#exampleModal">Add Recipe</button>
                            
                            </li>
                            <li class="nav-item">
                            <a class="nav-link disabled" href="#">Disabled</a>
                            </li>
                        </ul>
                        <form class="form-inline mt-2 mt-md-0">
                            <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        </div>
                    </nav>
                

                <h2>List of Recipes </h2>
                   <div class="album py-5 bg-light">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4" *ngFor = "let recipe of recipeList;trackBy:trackByIdCode">
                                <div class="card mb-4 box-shadow">
                                    <h5 class="card-title">{{recipe.recipeName}} </h5>
                                    <div class="card-body" >
                                        <p class="card-text">{{recipe.recipeIngredients}}</p>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="btn-group">
                                                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                                <button type="button" class="btn btn-sm btn-outline-secondary"  (click)="deleteRecipe(recipe._id)">Delete</button>
                                                </div>
                                            <small class="text-muted">9 mins</small>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            


                        </div>
                    </div>
                   </div>
                   
                   TODO: Edit Recipe. Ingreidents with quantity. Ingredients with style (Chopped. Diced. Sautee..etc). Search or Filter (by name or ingredient). 
                   TODO: Add to grocery List. Undo Button
                `
})
export class RecipesComponent{
    constructor(getRecipesService: GetRecipesService){
        getRecipesService.getRecipes().subscribe(promise=>{
            this.recipeList = promise;
        });
        this.recipeService=getRecipesService;
        
        
    }

    addRecipe(){
       console.log(this.formIngredients);
        this.recipeService.addRecipe(this.formRecipeName,this.formIngredients).subscribe(promise=>{
            console.log("promise"+promise);
            this.refreshRecipeList();
            this.formIngredients = undefined;
            this.formRecipeName = undefined;
        });
       
       
    }

    deleteRecipe(recipeId){
        console.log(recipeId);
        this.recipeService.deleteRecipe(recipeId).subscribe(promise=>{
            console.log(promise);
            this.refreshRecipeList();
        })
        
    }
    
    refreshRecipeList(){
        this.recipeService.getRecipes().subscribe(promise=>{
            console.log("refreshed");
            this.recipeList = promise;
        });
    }
        trackByIdCode(index: number, recipe: any): string {
        return recipe._id;
    }

    changeDetection;
    formRecipeName;
    formIngredients; 
    recipeService;
    recipeList;

}




// 