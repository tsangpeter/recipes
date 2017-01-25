var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);

var RecipeSchema = new Schema({
	food: {type: 'String', required: true},
	ingredient1: {type: 'String', required: true},
	ingredient2: {type: 'String', required: true},
	ingredient3: {type: 'String', required: true},
	ingredient4: {type: 'String', required: true},
	health: {type: Number, required: true},
	hunger: {type: Number, required: true},
	sanity: {type: Number, required: true}
});
var Recipe = mongoose.model('Recipe', RecipeSchema);


module.exports = Recipe;