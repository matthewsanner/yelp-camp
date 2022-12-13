const express = require('express');
// need mergeParams: true because route for reviews in app.js includes the id as a default in the http address and it is not being passed to this file unless you specify to do so
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')

const Campground = require('../models/campground');
const Review = require('../models/review');

const reviews = require('../controllers/reviews');

const wrapAsync = require('../utilities/wrapAsync');
const ExpressError = require('../utilities/ExpressError');

router.post('/', isLoggedIn, validateReview, wrapAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviews.deleteReview))

module.exports = router;