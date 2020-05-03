document.addEventListener('DOMContentLoaded', function () {
      var recipeName = document.getElementById("recipeName");
      var ingredients = document.getElementById("ingredients");
      var directions = document.getElementById("directions");
      var imgLink = document.getElementById("imgLink");
      var recipeSource = document.getElementById("recipeSource");
      var searchForm = document.getElementById("searchForm");
      var form_el = document.getElementById("myForm");
      var resultsFound = document.getElementById("test-data2");
      var el = document.getElementById("output");

      //Clear "No results found text" on input
      /*searchForm.addEventListener('input', updateValue);
      function updateValue() {
        resultsFound.textContent = "";
      }*/

      // Initialize Firebase
      const firebaseConfig = {
        apiKey: "AIzaSyAM5C9e5cfov13sVnRpzV7mTKmbscYrvbA",
        authDomain: "recipes-8b628.firebaseapp.com",
        databaseURL: "https://recipes-8b628.firebaseio.com",
        projectId: "recipes-8b628",
        storageBucket: "recipes-8b628.appspot.com",
        messagingSenderId: "144315483609",
        appId: "1:144315483609:web:9c12d4bbe79b803a0305c8",
        measurementId: "G-NETVQG5Q87"
      };

      firebase.initializeApp(firebaseConfig);

      //Array to store recipe data
      let newRecipes = [];
      let database = firebase.database();

      database.ref().on("child_added", function (snapshot) {

        //Create new object to store snapshots and calculations
        let newData = {
          one: snapshot.val().one,
          two: snapshot.val().two,
          three: snapshot.val().three,
          four: snapshot.val().four,
          five: newRecipes.length,
          six: snapshot.val().six
        }

        //Push data to newRecipes array
        newRecipes.push(newData);

        //fix pagination
        //list = newRecipes;

        //console.log('new Recipes after snapshot: ', newRecipes)

        mapResults();
      }); //end snapshot

      //Set up HTML layout for recipe cards
      let cardHTML1 = `<div class="card" style="width:80vw;"><img class="card-img-top" src="`
      let cardHTML2 = `" alt="Card image cap"><div class="card-body"><h5 class="card-title"><a href="`
      let cardHTML3 = `" target="_blank">`
      let cardHTML4 = `</a></h5><div class="accordion" id="accordionExample`
      let cardHTML5 = `"><div class="card"><div class="card-header" id="headingOne`
      let cardHTML6 = `"><h5 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne`
      let cardHTML7 = `" aria-expanded="false" aria-controls="collapseOne">Ingredients</button></h5></div><div id="collapseOne`
      let cardHTML8 = `" class="collapse" aria-labelledby="headingOne`
      let cardHTML9 = `" data-parent="#accordionExample`
      let cardHTML10 = `"><div class="card-body-ingredients">`
      let cardHTML11 = `</div></div></div><div class="card"><div class="card-header" id="headingTwo`
      let cardHTML12 = `"><h5 class="mb-0"><button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo`
      let cardHTML13 = `" aria-expanded="false" aria-controls="collapseTwo">Directions</button></h5></div><div id="collapseTwo`
      let cardHTML14 = `" class="collapse" aria-labelledby="headingTwo`
      let cardHTML15 = `" data-parent="#accordionExample`
      let cardHTML16 = `"><div class="card-body-directions">`
      let cardHTML17 = `</div></div></div></div></div></div>`;

      function mapResults() {
        //fix pagination=====================
        //loadList();    
        //document.getElementById("page-cont").style.visibility = "visible";
        //===================================
        let mappedItems = newRecipes.map(function (p) {
          return cardHTML1 + p.four + cardHTML2 + p.six + cardHTML3 + p.one + cardHTML4 + p.five + cardHTML5 + p.five + cardHTML6 + p.five +
            cardHTML7 + p.five + cardHTML8 + p.five + cardHTML9 + p.five + cardHTML10 + p.two + cardHTML11 + p.five + cardHTML12 +
            p.five + cardHTML13 + p.five + cardHTML14 + p.five + cardHTML15 + p.five + cardHTML16 + p.three + cardHTML17;
        });
        document.getElementById('output').innerHTML = mappedItems.join('<br>');
        //console.log('New Recipes: ',newRecipes)

      } //end mapResults

      //Fix pagination=======================================================

      /*document.getElementById("next").addEventListener("click", function () {
        console.log('next clicked');
        mapResults();

      });
      document.getElementById("first").addEventListener("click", function () {
        console.log('first clicked');
        mapResults();
      });
      document.getElementById("previous").addEventListener("click", function () {
        console.log('next clicked');
        mapResults();
      });
      document.getElementById("last").addEventListener("click", function () {
        console.log('next clicked');
        mapResults();
      });*/
      //=======================================================

      //On click SEARCH
      searchForm.addEventListener("submit", function (evt) {
        evt.preventDefault();

        //Filters by recipe name only
        //const search = (text) => newRecipes.filter(({ one }) => one.toLowerCase().includes(text.toLowerCase().trim()));
        //const result = search(document.getElementById("searchRecipe").value);

        let searchTerm = document.getElementById("searchRecipe").value.trim();
        console.log('searchTerm: ', searchTerm);
        function filterByValue(array, string) { return array.filter(o => { return Object.keys(o).some(k => { if (typeof o[k] === 'string') return o[k].toLowerCase().includes(string.toLowerCase()); }); }); }
        let result = filterByValue(newRecipes, searchTerm);
        console.log('Result: ', result)
        let searchResults = result.map(function (p) {
          return cardHTML1 + p.four + cardHTML2 + p.six + cardHTML3 + p.one + cardHTML4 + p.five + cardHTML5 + p.five + cardHTML6 + p.five +
            cardHTML7 + p.five + cardHTML8 + p.five + cardHTML9 + p.five + cardHTML10 + p.two + cardHTML11 + p.five + cardHTML12 +
            p.five + cardHTML13 + p.five + cardHTML14 + p.five + cardHTML15 + p.five + cardHTML16 + p.three + cardHTML17;
        })
        if (result.length === 0) {
          document.getElementById('test-data2').innerHTML = `No results found for "` + searchTerm + `."`;
          document.getElementById('test-data').innerHTML = "";
        }
        else {
          document.getElementById('test-data').innerHTML = `<h4>Search results for "` + searchTerm + `" (` + result.length + `):</h4>` + searchResults.join('<br>');
          document.getElementById('test-data2').innerHTML = "";
        }

        //Clear user input
        searchForm.reset();

        //Hide rest of recipes
        document.getElementById('output').innerHTML = "";

        //fix pagination
        //document.getElementById("page-cont").style.visibility = "hidden";

      }); //end search

      //On click reset
      document.getElementById("resetBtn").addEventListener("click", function () {
        document.getElementById('test-data').innerHTML = "";
        document.getElementById('test-data2').innerHTML = "";
        document.getElementById('moreRecipes').innerHTML = "";
        //fix pagination
        //firstPage();

        mapResults();
      });

      //On click submit (add recipe)
      form_el.addEventListener("submit", function (evt) {
        evt.preventDefault();

        //Pull user input
        one = document.getElementById("recipeName").value;
        two = document.getElementById("ingredients").value;
        three = document.getElementById("directions").value;
        four = document.getElementById("imgLink").value;
        six = document.getElementById("recipeSource").value;
        five = newRecipes.length;

        //Push user input to Firebase
        database.ref().push({
          one: one,
          two: two,
          three: three,
          four: four,
          five: five,
          six: six
        });

        //Clear user input
        form_el.reset();
      })//end submit
    })