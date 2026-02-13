const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/auth');

// Admin authentication
router.post('/login', adminController.login);
router.post('/register', adminController.register);

// Mass Sermons
router.get('/mass-sermons', authenticateAdmin, adminController.getMassSermons);
router.get('/mass-sermons/:id', authenticateAdmin, adminController.getMassSermonById);
router.post('/mass-sermons', authenticateAdmin, adminController.createMassSermon);
router.put('/mass-sermons/:id', authenticateAdmin, adminController.updateMassSermon);
router.delete('/mass-sermons/:id', authenticateAdmin, adminController.deleteMassSermon);

// Weekly Masses
router.get('/weekly-masses', authenticateAdmin, adminController.getWeeklyMasses);
router.get('/weekly-masses/:id', authenticateAdmin, adminController.getWeeklyMassById);
router.post('/weekly-masses', authenticateAdmin, adminController.createWeeklyMass);
router.put('/weekly-masses/:id', authenticateAdmin, adminController.updateWeeklyMass);
router.delete('/weekly-masses/:id', authenticateAdmin, adminController.deleteWeeklyMass);

// Update Links
router.get('/update-links', authenticateAdmin, adminController.getUpdateLinks);
router.get('/update-links/:id', authenticateAdmin, adminController.getUpdateLinkById);
router.post('/update-links', authenticateAdmin, adminController.createUpdateLink);
router.put('/update-links/:id', authenticateAdmin, adminController.updateUpdateLink);
router.delete('/update-links/:id', authenticateAdmin, adminController.deleteUpdateLink);

// Admin Rights Management
router.get('/admins', authenticateAdmin, adminController.getAdmins);
router.get('/admins/:id', authenticateAdmin, adminController.getAdminById);
router.post('/admins', authenticateAdmin, adminController.createAdmin);
router.put('/admins/:id', authenticateAdmin, adminController.updateAdmin);
router.put('/admins/:id/role', authenticateAdmin, adminController.updateAdminRole);
router.delete('/admins/:id', authenticateAdmin, adminController.deleteAdmin);

module.exports = router;
