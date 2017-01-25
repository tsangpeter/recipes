var express = require('express');
var router = express.Router();
var Recipe = require('../../models/recipes');
 router.get('/', function(req, res, next) {
     Recipe.findAsync()
     .then(function(recipes) {
       res.render('recipes', {title: 'Recipes', recipes: recipes});
     })
     .catch(next)
     .error(console.error);
   });

   router.route('/:id')
  .get(function(req, res, next) {
    Recipe.findOneAsync({_id: req.params.id}, {food: 1, ingredient1: 1, ingredient2: 1, ingredient3: 1, ingredient4: 1, health: 1, hunger: 1})
    .then(function(recipe) {
      // res.json(recipe);
	  // console.log(recipe);
      res.render('show', {'recipe':recipe});
    })
    .catch(next)
    .error(console.error);
  })
  
module.exports = router;
