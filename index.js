
const API_KEY = "0b9699ead3794a03af21e77bbfd1e81d";

const recipesList = document.querySelector("#recipe-list");

//Function to display recipes and since it doesn't have await function, it won't be an async function
function displayRecipes(recipes) {

    recipesList.innerHTML = ""; //Makes the page have an empty list

    recipes.forEach((recipe) => {
        const recipeItem = document.createElement("li");
        recipeItem.classList.add('recipe-item');
        recipesList.appendChild(recipeItem);

        const recipeImage = document.createElement("img");
        recipeImage.src = recipe.image; //gets the recipe image
        recipeImage.alt = "recipe-image";
        recipeItem.appendChild(recipeImage);
        
        const recipeHeader = document.createElement("h2");
        recipeHeader.innerText = recipe.title; //gets the recipe title and we used h2
        recipeItem.appendChild(recipeHeader);
        
        const recipeItemDiv = document.createElement("p");
        recipeItemDiv.classList.add("recipe-item__ingredients-list");
        recipeItemDiv.innerHTML = `<h2><strong>Ingredients:</strong></h2>`;

        const recipeItemIngredients = document.createElement("ul");
        recipeItemIngredients.classList.add("ingredients");
        
        recipe.extendedIngredients.map((ingredient) => {
            const recipeItemIngredient = document.createElement("li");
            recipeItemIngredient.classList.add("ingredients__ingredient");
            recipeItemIngredient.innerText = ingredient.original;
            recipeItemIngredients.appendChild(recipeItemIngredient); 
        });
        recipeItemDiv.appendChild(recipeItemIngredients);
        

        const recipeSourceLink = document.createElement("a");
        recipeSourceLink.href = recipe.sourceUrl;
        recipeSourceLink.target = "_blank";
        recipeSourceLink.innerText = "View Recipe";

        recipeItem.appendChild(recipeItemDiv);
        recipeItem.appendChild(recipeSourceLink);
    });

}

//This function too will wait for the API to respond before taking action reason we use async (Asynchronous)
async function getRecipes() {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
    ); //fetch will get the data and ?number will ask for number of items needed
    

    const data = await response.json(); //.json() converts javascript strings to JSON objects

    return data.recipes;
}


//This function will wait for the getRecipes() before taking any action 
async function init() {
    const recipes = await getRecipes();

    //display recipe with an argument(input) of recipe
    displayRecipes(recipes);

    // console.log(recipes);
    console.log(recipes);
    
}

init(); // this will trigger the function and fetch new recipe from the API