// Edamam Keys
var eappID = "7f73f3c0";
var eapiKey = "227a23c3411db5a135d11a5d5fe3dc22";

// Spoonacular Keys
var sapiKey = "59d00d4a1c914e6d9187b6fbf888f420";

// Parse the information about the chosen recipe
getRecipeURL = function () {
    var recipeString = `?${window.location.href.split("?")[1]}`;
    var searchTerms = new URLSearchParams(recipeString);
    console.log(searchTerms.get("sourceAPI"), searchTerms.get("recipe"));
    var sourceAPI = searchTerms.get("sourceAPI");
    var recipeIdentifier = searchTerms.get("recipe");
    
    console.log(recipeIdentifier);
    console.log(sourceAPI);
    if (recipeIdentifier) {
        if (sourceAPI === "edamam") {
            getEdamamRecipe(encodeURIComponent(recipeIdentifier));
        } else if (sourceAPI === "spoonacular") {
            getSpoonacularRecipe(recipeIdentifier);
        } else {
            document.location.replace('./index.html');
          }
    }
    

  };
  getRecipeURL(); 


// Edamam gets the recipes from a specific search
  function getEdamamRecipe(recipeIdentifier) {
    var r = recipeIdentifier
    console.log(r);
    fetch("https://api.edamam.com/search?r=" + r + "&app_id="+ eappID+ "&app_key=" + eapiKey)
        .then(function(searchResponse){
            console.log(searchResponse);
            return searchResponse.json()
                .then(function(searchData){
                    console.log(searchData);
                   
                        var result = {
                            title: searchData[0].label,
                            imageURL: searchData[0].image,
                            ingredientsArr: searchData[0].ingredients,
                            source: searchData[0].url
                            
                        }
                    console.log(result);



                    //displayRecipe(result);
                        
                })
                    
            })
        }


// Spoonacular gets the recipes from the random search
  function getSpoonacularRecipe(recipeID) {
    fetch("https://api.spoonacular.com/recipes/" + recipeID+ "/information?apiKey="+ sapiKey + "&includeNutrition=false")
    .then(function(searchResponse){
        console.log(searchResponse);
        return searchResponse.json()
        .then(function(searchData){
            console.log(searchData);
            var result = {
                title: searchData.title,
                imageURL: searchData.image,
                ingredientsArr: searchData.extendedIingredients,
                instructions: searchData.instructions,
                source: searchData.sourceUrl

                
            }
            console.log(result);
            //displayRecipe(result);
        })
    })
}

function displayRecipe(result) {
    document.getElementById("title").textContent = result.title;
    document.getElementById("source-link").setAttribute("href", result.source);
    document.getElementById("recipe-img").setAttribute("src", result.imageURL);
    
    if (result.instructions){
        document.getElementById("instructions").textContent
    }

}

