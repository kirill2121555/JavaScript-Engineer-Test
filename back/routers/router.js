const Router = require('express');
const router = new Router()
const { body } = require('express-validator')
const superheroController = require('../controllers/superheroController');
const fileMideeleware = require('../middlewares/file-mideeleware');
const validationMiddlevare = require('../middlewares/validation-middlevare');

router.post('/upload', fileMideeleware.array('picture'), superheroController.add_img)
router.get('/superheros', superheroController.getsuperheroes);
router.post('/superhero',
    body('nickname').isLength({ min: 1, max: 20 }).withMessage('length must be between 1 and 20'),
    body('name_picture').isArray().withMessage('Must be an array'),
    body('real_name').isLength({ min: 1, max: 35 }).withMessage('length must be between 1 and 35'),
    body('origin_description').notEmpty().withMessage('Can not be empty'),
    body('superpowers').notEmpty().withMessage('Can not be empty'),
    body('catch_phrase').notEmpty().withMessage('Can not be empty'),
    validationMiddlevare,
    superheroController.create_superhero);

router.put('/superhero/:id',
    body('nickname').isLength({ min: 1, max: 30 }).withMessage('length must be between 1 and 30'),
    body('real_name').isLength({ min: 1, max: 35 }).withMessage('length must be between 1 and 35'),
    body('origin_description').notEmpty().withMessage('Can not be empty'),
    body('superpowers').notEmpty().withMessage('Can not be empty'),
    body('catch_phrase').notEmpty().withMessage('Can not be empty'),
    body('oldimages').isArray().withMessage('Must be an array'),
    body('new_name_picture').isArray().withMessage('Must be an array'),
    validationMiddlevare,
    superheroController.update_superhero);

router.get('/superhero/:id', superheroController.getsuperhero);
router.delete('/superhero/:id', superheroController.delete_superhero)

module.exports = router