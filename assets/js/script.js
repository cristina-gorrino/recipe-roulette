// Edamam Keys
var eappID = "7f73f3c0";
var eapiKey = "227a23c3411db5a135d11a5d5fe3dc22";

// Spoonacular Keys
var sapiKey = "59d00d4a1c914e6d9187b6fbf888f420";


//curl "https://api.edamam.com/search?q=chicken&app_id=7f73f3c0&app_key=227a23c3411db5a135d11a5d5fe3dc22&from=0&to=3&calories=591-722&health=alcohol-free"


// Use Edamam to search by keyword
// Get input from user, then display ingredients and link to source recipe
function getRecipeData(eappID, eapiKey) {

    fetch("https://api.edamam.com/search?q=chicken&app_id="+ eappID+ "&app_key=" + eapiKey+ "&from=0&to=3&calories=591-722&health=alcohol-free")
        .then(function(searchResponse){
            console.log(searchResponse);
            return searchResponse.json()
                .then(function(searchData){
                console.log(searchData);
                var srcURL = searchData.hits[0].recipe.url;
                console.log(srcURL);

                         
                })
                    
            })
        }

// Searching with spoonacular is a 2 step process. First search, then pass recipe ID to a second call to get details
// Use Spoonacular to find the random recipes
// TODO: allow user to select tags to add to request

function getSpoonacularData(sapiKey) {

    fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=" + sapiKey + "&query=pasta&maxFat=25&number=2")
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
    

                
getSpoonacularData(sapiKey);
getRecipeData(eappID, eapiKey);



    //event.preventDefault();
    //var searchString = searchInputEl.value;
   /*
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + searchCity + "&limit=1&appid=" + apiKey)
        .then(function(geoResponse){
            return geoResponse.json()     
            .then(function(geoData){
                var lat = geoData[0].lat;
                var lon = geoData[0].lon;
                var cityName = geoData[0].name;
                historyArr.push({"city":cityName, "longitude": lon, "latitude": lat});
                localStorage.setItem("historyArr", JSON.stringify(historyArr));
                */