class Recipe{
    constructor(recipeName,recipeIngredients){
        this.recipeName = recipeName;
        this.recipeIngredients = recipeIngredients;
    }
    getName(){
        return this.recipeName;
    }
    setName(recipeName){
        this.recipeName=recipeName;
    }
    getIngredients(){
        return this.recipeIngredients;
    }
    setIngredients(recipeIngredients){
        this.recipeIngredients=recipeIngredients;
    }

};

module.exports.Recipe=Recipe;