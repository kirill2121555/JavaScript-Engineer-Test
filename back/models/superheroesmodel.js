const { Schema, model } = require('mongoose');

const SuperheroSchema = new Schema({

    nickname: { type: String, required: true, unique: true },
    real_name: { type: String, required: true },
    origin_description: { type: String, required: true },
    superpowers: { type: String, required: true },
    catch_phrase: { type: String, required: true },
    images: [{ type: String }]

})

module.exports = model('Superhero', SuperheroSchema);