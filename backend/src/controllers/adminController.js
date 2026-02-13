const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

// Admin Authentication
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query(
      'SELECT * FROM admins WHERE username = $1 OR email = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const admin = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      data: {
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          is_super_admin: admin.is_super_admin
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, full_name, role, is_super_admin } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO admins (username, email, password_hash, full_name, role, is_super_admin)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, username, email, role, is_super_admin, created_at`,
      [username, email, hashedPassword, full_name || null, role || 'admin', is_super_admin || false]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        error: 'Username or email already exists'
      });
    }
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Mass Sermons
exports.getMassSermons = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM mass_sermons ORDER BY date DESC, created_at DESC'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getMassSermonById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mass_sermons WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Sermon not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createMassSermon = async (req, res) => {
  try {
    const { title, description, speaker, date, video_url, audio_url, thumbnail_url, duration } = req.body;
    const result = await pool.query(
      `INSERT INTO mass_sermons (title, description, speaker, date, video_url, audio_url, thumbnail_url, duration, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [title, description, speaker, date, video_url, audio_url, thumbnail_url, duration, req.admin.id]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateMassSermon = async (req, res) => {
  try {
    const { title, description, speaker, date, video_url, audio_url, thumbnail_url, duration } = req.body;
    const result = await pool.query(
      `UPDATE mass_sermons 
       SET title = $1, description = $2, speaker = $3, date = $4, video_url = $5, 
           audio_url = $6, thumbnail_url = $7, duration = $8, updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING *`,
      [title, description, speaker, date, video_url, audio_url, thumbnail_url, duration, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Sermon not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteMassSermon = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM mass_sermons WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Sermon not found' });
    }
    res.json({ success: true, message: 'Sermon deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Weekly Masses
exports.getWeeklyMasses = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM weekly_masses ORDER BY date DESC, time DESC'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getWeeklyMassById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM weekly_masses WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Weekly mass not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createWeeklyMass = async (req, res) => {
  try {
    const { week_start_date, week_end_date, title, description, service_type, date, time, location, speaker, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO weekly_masses (week_start_date, week_end_date, title, description, service_type, date, time, location, speaker, notes, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [week_start_date, week_end_date, title, description, service_type, date, time, location, speaker, notes, req.admin.id]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateWeeklyMass = async (req, res) => {
  try {
    const { week_start_date, week_end_date, title, description, service_type, date, time, location, speaker, notes } = req.body;
    const result = await pool.query(
      `UPDATE weekly_masses 
       SET week_start_date = $1, week_end_date = $2, title = $3, description = $4, service_type = $5,
           date = $6, time = $7, location = $8, speaker = $9, notes = $10, updated_at = CURRENT_TIMESTAMP
       WHERE id = $11
       RETURNING *`,
      [week_start_date, week_end_date, title, description, service_type, date, time, location, speaker, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Weekly mass not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteWeeklyMass = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM weekly_masses WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Weekly mass not found' });
    }
    res.json({ success: true, message: 'Weekly mass deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Links
exports.getUpdateLinks = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM update_links ORDER BY display_order ASC, created_at DESC'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUpdateLinkById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM update_links WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Link not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createUpdateLink = async (req, res) => {
  try {
    const { title, url, description, category, is_active, display_order } = req.body;
    const result = await pool.query(
      `INSERT INTO update_links (title, url, description, category, is_active, display_order, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, url, description, category, is_active !== undefined ? is_active : true, display_order || 0, req.admin.id]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateUpdateLink = async (req, res) => {
  try {
    const { title, url, description, category, is_active, display_order } = req.body;
    const result = await pool.query(
      `UPDATE update_links 
       SET title = $1, url = $2, description = $3, category = $4, is_active = $5, 
           display_order = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [title, url, description, category, is_active, display_order, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Link not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteUpdateLink = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM update_links WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Link not found' });
    }
    res.json({ success: true, message: 'Link deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Admin Rights Management
exports.getAdmins = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, full_name, role, is_super_admin, created_at FROM admins ORDER BY created_at DESC'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, full_name, role, is_super_admin, created_at FROM admins WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Admin not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { username, email, password, full_name, role, is_super_admin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO admins (username, email, password_hash, full_name, role, is_super_admin)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, username, email, full_name, role, is_super_admin, created_at`,
      [username, email, hashedPassword, full_name, role || 'admin', is_super_admin || false]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ success: false, error: 'Username or email already exists' });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const { username, email, full_name, role } = req.body;
    const result = await pool.query(
      `UPDATE admins 
       SET username = $1, email = $2, full_name = $3, role = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING id, username, email, full_name, role, is_super_admin, created_at`,
      [username, email, full_name, role, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Admin not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateAdminRole = async (req, res) => {
  try {
    const { role, is_super_admin } = req.body;
    const result = await pool.query(
      `UPDATE admins 
       SET role = $1, is_super_admin = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING id, username, email, role, is_super_admin`,
      [role, is_super_admin, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Admin not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    // Prevent deleting yourself
    if (parseInt(req.params.id) === req.admin.id) {
      return res.status(400).json({ success: false, error: 'Cannot delete your own account' });
    }
    const result = await pool.query('DELETE FROM admins WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Admin not found' });
    }
    res.json({ success: true, message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
