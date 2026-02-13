const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

(async () => {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await pool.query(
      'INSERT INTO admins (username, email, password_hash, full_name, role, is_super_admin) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (username) DO NOTHING',
      ['admin', 'admin@voshkitengela.org', hashedPassword, 'Super Admin', 'admin', true]
    );
    console.log('✅ Default admin created: username=admin, password=admin123');
    process.exit(0);
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
})();
