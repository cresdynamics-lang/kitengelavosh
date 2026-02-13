const express = require('express');
const router = express.Router();
const landingController = require('../controllers/landingController');

// Get church information
router.get('/info', landingController.getChurchInfo);

// Get services
router.get('/services', landingController.getServices);

// Get core values
router.get('/core-values', landingController.getCoreValues);

// Get carousel images
router.get('/carousel', landingController.getCarouselImages);

// Get contact information
router.get('/contact', landingController.getContactInfo);

module.exports = router;
