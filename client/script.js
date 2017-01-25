var $ = require('jquery');

$(function() {
   $(":button").on('click', addRecipe);
});

$(":text").on('keypress',function(e) {
  var key = e.keyCode;
  if( key == 13 || key == 169) {
    addRecipe();
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
});

var addRecipe = function() {
   var name = $('#add-recipe-name').val();
   var ingredient1 = $('#add-recipe-ingredient1').val();
   var ingredient2 = $('#add-recipe-ingredient2').val();
   var ingredient3 = $('#add-recipe-ingredient3').val();
   var ingredient4 = $('#add-recipe-ingredient4').val();
   var health = $('#health').val();
   var hunger = $('#hunger').val();
   var sanity = $('#sanity').val();
   $.ajax({
     url: '/api/recipes',
     type: 'POST',
     data: {
       name: name,
       ingredient1: ingredient1,
       ingredient2: ingredient2,
       ingredient3: ingredient3,
       ingredient4: ingredient4,
       health: health,
       hunger: hunger,
       sanity: sanity
     },
     dataType: 'json',
     success: function(data) {
       var recipe = data.recipe;
       var newLiHtml = recipeTemplate(recipe);
       $('form + ul').append(newLiHtml);
       $('#add-recipe-name').val('');
       $('#add-recipe-ingredient1').val('');
       $('#add-recipe-ingredient2').val('');
       $('#add-recipe-ingredient3').val('');
       $('#add-recipe-ingredient4').val('');
       $('#health').val('');
       $('#hunger').val('');
       $('#sanity').val('');
     }
   });
};

var recipeTemplate = require("../views/partials/recipe.hbs");