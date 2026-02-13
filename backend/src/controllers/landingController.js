const {
  CHURCH_INFO,
  BRAND_COLORS,
  CORE_VALUES,
  SERVICES,
  CAROUSEL_IMAGES
} = require('../config/constants');

// Get church information
exports.getChurchInfo = (req, res) => {
  try {
    res.json({
      success: true,
      data: CHURCH_INFO
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get services
exports.getServices = (req, res) => {
  try {
    res.json({
      success: true,
      data: SERVICES
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get core values
exports.getCoreValues = (req, res) => {
  try {
    res.json({
      success: true,
      data: CORE_VALUES
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get carousel images
exports.getCarouselImages = (req, res) => {
  try {
    res.json({
      success: true,
      data: CAROUSEL_IMAGES
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get contact information
exports.getContactInfo = (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        phoneNumbers: CHURCH_INFO.phoneNumbers,
        email: CHURCH_INFO.email,
        location: CHURCH_INFO.location,
        socialMedia: CHURCH_INFO.socialMedia,
        website: CHURCH_INFO.website
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
