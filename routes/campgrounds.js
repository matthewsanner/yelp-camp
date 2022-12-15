const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const wrapAsync = require('../utilities/wrapAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const Campground = require('../models/campground');
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage });

router.route('/')
    .get(wrapAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, wrapAsync(campgrounds.createCampground));
// was using this for testing purposes
// .post(upload.array('image'), (req, res) => {
//     console.log(req.body, req.files);
//     res.send('It worked!')
// });

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(wrapAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, wrapAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, wrapAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campgrounds.renderEditForm));

module.exports = router;