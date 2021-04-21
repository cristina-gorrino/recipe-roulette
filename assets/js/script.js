var searchInputEl = document.getElementById("search-input");
var searchFormEl = document.querySelector("form");
var randomBtnEl = document.getElementById("random-btn");

// Edamam Keys
var eappID = "7f73f3c0";
var eapiKey = "227a23c3411db5a135d11a5d5fe3dc22";

// Spoonacular Keys
var sapiKey = "59d00d4a1c914e6d9187b6fbf888f420";


//curl "https://api.edamam.com/search?q=chicken&app_id=7f73f3c0&app_key=227a23c3411db5a135d11a5d5fe3dc22&from=0&to=3&calories=591-722&health=alcohol-free"



searchFormEl.addEventListener("submit", getRecipeData);
randomBtnEl.addEventListener("click", getSpoonacularRandom);



// Use Edamam to search by keyword
// Get input from user, then display ingredients and link to source recipe
function getRecipeData(event) {
    event.preventDefault();
    var queryTerm = searchInputEl.value
    console.log(queryTerm);
    fetch("https://api.edamam.com/search?q=" + queryTerm + "&app_id="+ eappID+ "&app_key=" + eapiKey + "&from=0&to=3")
        .then(function(searchResponse){
            console.log(searchResponse);
            return searchResponse.json()
                .then(function(searchData){
                    console.log(searchData);
                    var resultArr = [];
                    for (var i = 0; i < 3; i++) {
                        var result = {
                            result: i,
                            title: searchData.hits[i].recipe.label,
                            imageURL: searchData.hits[i].recipe.image,
                            recipeURL: searchData.hits[i].recipe.uri
                            
                        }
                        resultArr.push(result);
                    }
                var srcURL = searchData.hits[0].recipe.url;
                console.log(srcURL);
                // capturing recipe images and displaying them in cards
                var imgResult1 = document.getElementById("recipe-img1")
                imgResult1.setAttribute("src", searchData.hits[0].recipe.image);
                var imgResult2 = document.getElementById("recipe-img2")
                imgResult2.setAttribute("src", searchData.hits[1].recipe.image);
                var imgResult3 = document.getElementById("recipe-img3")
                imgResult3.setAttribute("src", searchData.hits[2].recipe.image);

                    displayResults(resultArr);
                         
                })
                    
            })
        }

function displayResults(resultArr) {
    for (var i=0; i<3; i++){
        document.getElementById("result-link"+i).textContent = resultArr[i].title;
        document.getElementById("result-link"+i).setAttribute("href", "./recipe.html?recipe=" +resultArr[i].recipeURL);
    }

}


// Use Spoonacular to find the random recipes
// TODO: allow user to select tags to add to request

function getSpoonacularRandom(event) {
    fetch("https://api.spoonacular.com/recipes/random?apiKey=" + sapiKey + "&number=3")
    .then(function(searchResponse){
        console.log(searchResponse);
        return searchResponse.json()
        .then(function(searchData){
            console.log(searchData);
            console.log(searchData.recipes[i])
            var resultArr = [];
            for(var i=0; i<3; i++) {
                var result = {
                    result: i,
                    title: searchData.recipes[i].title,
                    imageURL: searchData.recipes[i].image,
                    recipeURL: searchData.recipes[i].spoonacularSourceUrl
                }
                resultArr.push(result);
            }
            displayResults(resultArr);


    
            // capturing recipe images and displaying them in cards
            var imgResult1 = document.getElementById("recipe-img1")
                imgResult1.setAttribute("src", searchData.recipes[0].image);
            var imgResult2 = document.getElementById("recipe-img2")
                imgResult2.setAttribute("src", searchData.recipes[1].image);
            var imgResult3 = document.getElementById("recipe-img3")
                imgResult3.setAttribute("src", searchData.recipes[2].image);
                             
        })
                        
    })
}



// TODO: these functions not used
// Searching with spoonacular is a 2 step process. First search, then pass recipe ID to a second call to get details
function getSpoonacularData(sapiKey, queryTerm) {

    fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=" + sapiKey + "&query="+ queryTerm +"&maxFat=25&number=2")
        .then(function(searchResponse){
            console.log(searchResponse);
            return searchResponse.json()
            .then(function(searchData){
                console.log(searchData);
                var recipeID = searchData.results[0].id;
                console.log(recipeID);
                getRecipeDetails(recipeID, sapiKey);
        
                                 
            })
                            
        })
}

function getRecipeDetails(recipeID, sapiKey) {
    fetch("https://api.spoonacular.com/recipes/" + recipeID+ "/information?apiKey="+ sapiKey + "&includeNutrition=false")
    .then(function(searchResponse){
        console.log(searchResponse);
        return searchResponse.json()
        .then(function(searchData){
            console.log(searchData);
        })
    })
}
    

                
//getSpoonacularData(sapiKey, queryTerm);
//getRecipeData(queryTerm, eappID, eapiKey);


