const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Verify admin exists
    const result = await pool.query(
      'SELECT id, username, email, role, is_super_admin FROM admins WHERE id = $1',
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Admin not found'
      });
    }

    req.admin = result.rows[0];
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
};

const requireSuperAdmin = (req, res, next) => {
  if (!req.admin || !req.admin.is_super_admin) {
    return res.status(403).json({
      success: false,
      error: 'Super admin access required'
    });
  }
  next();
};

module.exports = {
  authenticateAdmin,
  requireSuperAdmin
};
