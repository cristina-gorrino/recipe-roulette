var searchInputEl = document.getElementById("search-input");
var searchBtnEl = document.querySelector("#search-btn");
var randomBtnEl = document.getElementById("random-btn");

// Edamam Keys
var eappID = "7f73f3c0";
var eapiKey = "227a23c3411db5a135d11a5d5fe3dc22";

// Spoonacular Keys
var sapiKey = "59d00d4a1c914e6d9187b6fbf888f420";


//curl "https://api.edamam.com/search?q=chicken&app_id=7f73f3c0&app_key=227a23c3411db5a135d11a5d5fe3dc22&from=0&to=3&calories=591-722&health=alcohol-free"



searchBtnEl.addEventListener("click", getRecipeData);
randomBtnEl.addEventListener("click", getSpoonacularRandom);
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });



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
                            sourceAPI: "edamam",
                            title: searchData.hits[i].recipe.label,
                            imageURL: searchData.hits[i].recipe.image,
                            recipeURL: searchData.hits[i].recipe.uri
                            
                        }
                        resultArr.push(result);
                    }
                var srcURL = searchData.hits[0].recipe.url;
                console.log(srcURL);


                    displayResults(resultArr);
                         
                })
                    
            })
        }

function displayResults(resultArr) {
    for (var i=0; i<3; i++){
        document.getElementById("result-link"+i).textContent = resultArr[i].title;
        document.getElementById("result-link"+i).setAttribute("href", "./recipe.html?sourceAPI=" +resultArr[i].sourceAPI +"&recipe=" +resultArr[i].recipeURL);
        document.getElementById("recipe-img"+i).setAttribute("src", resultArr[i].imageURL);
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
                    sourceAPI: "spoonacular",
                    title: searchData.recipes[i].title,
                    imageURL: searchData.recipes[i].image,
                    recipeURL: searchData.recipes[i].id
                }
                resultArr.push(result);
            }
            displayResults(resultArr);


    
                             
        })
                        
    })
}





