// Define an array to store recipes
let recipes = [];

// Load recipes from the JSON file on page load
window.onload = function () {
    fetchRecipes();

    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", searchRecipes);

    // Add event listeners to form submit button
    document.getElementById("recipe-form").addEventListener("submit", submitRecipe);
};

// Function to get display tags
function displayTags(tags) {
  let htmlTags = ``;
  for (tag of tags) {
    htmlTags += `<span class="tag" onClick="searchTag()">${tag}</span>`
  }
  return `<div>${htmlTags}</div>`
}

// Function to display card 
function displayCard({title, description, code_link, tags}) {
  return `
  <div class="card">
      <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
          ${displayTags(tags)}
          <a href="${code_link}" class="btn btn-primary" target="_blank">View Code</a>
      </div>
  </div>
`
}

// Function to fetch recipes from the JSON file
function fetchRecipes() {
    fetch("recipes.json")
        .then(response => response.json())
        .then(data => {
            recipes = data;
            displayRecipes();
        });
}

// Function to display recipes
function displayRecipes() {
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";
        card.innerHTML = displayCard(recipe);
        recipeList.appendChild(card);
    });
}

// Function to add a new recipe
function submitRecipe(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const codeLink = document.getElementById("code-link").value;

    if (title && description && codeLink) {
        const newRecipe = {
            title,
            description,
            code_link: codeLink
        };
        recipes.push(newRecipe);
        displayRecipes();
        saveRecipes();
        document.getElementById("recipe-form").reset();
    }
}

// Function to save recipes to the JSON file
function saveRecipes() {
    fetch("recipes.json", {
        method: "POST",
        body: JSON.stringify(recipes),
    });
}

// Function to search recipes
function searchRecipes() {
    const searchInput = document.getElementById("search-input");
    const searchTerm = searchInput.value.toLowerCase();

    const filteredRecipes = recipes.filter(recipe => {
        return recipe.title.toLowerCase().includes(searchTerm) || recipe.description.toLowerCase().includes(searchTerm);
    });

    displayFilteredRecipes(filteredRecipes);
}

//Function to search tag
function searchTag() {
 const filteredRecipes = recipes.filter(recipe => {
      return recipe.tags.includes(event.srcElement.innerText) 
  });

  displayFilteredRecipes(filteredRecipes);
}

// Function to display filtered recipes
function displayFilteredRecipes(filteredRecipes) {
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";

    filteredRecipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";
        card.innerHTML = displayCard(recipe);
        recipeList.appendChild(card);
    });
}
