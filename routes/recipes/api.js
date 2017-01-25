var express = require('express');
var router = express.Router();

var Recipe = require('../../models/recipes');

 router.route('/')
   .get(function(req, res, next) {
     Recipe.findAsync({})
     .then(function(recipes) {
       res.json(recipes);
     })
     .catch(next)
     .error(console.error);
   })
   .post(function(req, res, next) {
    var recipe = new Recipe();
    recipe.food = req.body.name;
    recipe.ingredient1 = req.body.ingredient1;
    recipe.ingredient2 = req.body.ingredient2;
    recipe.ingredient3 = req.body.ingredient3;
    recipe.ingredient4 = req.body.ingredient4;
    recipe.health = req.body.health;
    recipe.hunger = req.body.hunger;
    recipe.sanity = req.body.sanity;
    recipe.saveAsync()
    .then(function(recipe) {
      console.log("success");
      res.json({'status': 'success', 'recipe': recipe});
    })
    .catch(function(e) {
      console.log("fail");
      res.json({'status': 'error', 'error': e});
    })
    .error(console.error);
  });

  router.route('/:id')
  // .get(function(req, res, next) {
  //   Recipe.findOneAsync({_id: req.params.id}, {food: 1, ingredient1: 1, ingredient2: 1, ingredient3: 1, ingredient4: 1, health: 1, hunger: 1})
  //   .then(function(recipe) {
  //     // res.json(recipe);
	 //  // console.log(recipe);
  //     res.render('show', {'recipe':recipe});
  //   })
  //   .catch(next)
  //   .error(console.error);
  // })
  .put(function(req, res, next) {
    var recipe = {};
    var prop;
    for (prop in req.body) {
      recipe[prop] = req.body[prop];
    }
    Recipe.updateAsync({_id: req.params.id}, recipe)
    .then(function(updatedRecipe) {
      return res.json({'status': 'success', 'recipe': updatedRecipe});
    })
    .catch(function(e){
      return res.status(400).json({'status': 'fail', 'error': e});
    });
  })
  .delete(function(req, res, next) {
    Recipe.findByIdAndRemoveAsync(req.params.id)
    .then(function(deletedRecipe) {
      res.json({'status': 'success', 'recipe': deletedRecipe});
    })
    .catch(function(e) {
      res.status(400).json({'status': 'fail', 'error': e});
    });
  });

 module.exports = router;