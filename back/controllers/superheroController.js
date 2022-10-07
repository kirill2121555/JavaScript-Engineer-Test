const superheroesmodel = require('../models/superheroesmodel')
const fs = require('fs')

const delete_foto = (array_foto) => {
    for (let i = 0; i < array_foto.length; i++) {
        fs.unlink(`images/${array_foto[i]}`, (err) => {
            if (err) throw new Error('error with delete file');
        });
    }
}

const find = (getsuperheroes, text) => {
    const arr = []
    for (let i = 0; i < getsuperheroes.length; i++) {
        if (getsuperheroes[i].nickname.toLowerCase().includes(text)) {
            arr.push(getsuperheroes[i])
        }
    }
    return arr
}

class superheroController {
    async create_superhero(req, res) {
        try {
            const { name_picture, nickname, real_name, origin_description, superpowers, catch_phrase } = req.body
            const newsuperhero = await superheroesmodel.create({ nickname, real_name, origin_description, superpowers, catch_phrase, images: [...name_picture] })
            return res.status(201).json(newsuperhero)
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async delete_superhero(req, res) {
        try {
            const { id } = req.params
            const newsuperhero = await superheroesmodel.findByIdAndDelete({ _id: id })
            if (newsuperhero.images.length > 0) {
                delete_foto(newsuperhero.images)
            }
            return res.status(204).json('File deleted')
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async update_superhero(req, res) {
        try {
            const { oldimages, new_name_picture, nickname, real_name, origin_description, superpowers, catch_phrase } = req.body
            const { id } = req.params
            const oldpict = await superheroesmodel.findById(id, { images: 1 }).lean()
            const images_for_delete = oldpict.images.filter((el) => !oldimages.includes(el));
            if (images_for_delete.length > 0) {
                delete_foto(images_for_delete)
            }
            const superhero_update = await superheroesmodel.findByIdAndUpdate({ _id: id }, { $set: { nickname, real_name, origin_description, superpowers, catch_phrase, images: [...oldimages, ...new_name_picture] } })
            return res.status(201).json(superhero_update)
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async getsuperhero(req, res) {
        try {
            const { id } = req.params
            const superhero = await superheroesmodel.findById(id).lean()
            if (superhero) {
                return res.status(200).json(superhero)
            }
            throw new Error('could not find the superhero')
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async getsuperheroes(req, res) {
        try {
            const { serch } = req.query
            const getsuperheroes = await superheroesmodel.find({}, { nickname: 1, images: 1 }).sort({ _id: -1 }).lean()
            if (serch === '') return res.status(200).json(getsuperheroes)
            if (serch !== '') return res.status(200).json(find(getsuperheroes, serch.toLowerCase()))
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
    async add_img(req, res) {
        try {
            if (req.files) {
                return res.status(200).json(req.files)
            }
            throw new Error("No files");
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }
}

module.exports = new superheroController();