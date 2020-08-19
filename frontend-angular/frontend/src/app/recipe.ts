export class Recipe{
    recipeName : '';
    ingredientList = [];

    constructor(recipeName,ingredientList){
        this.recipeName = recipeName;
        this.ingredientList = ingredientList;
    }
}