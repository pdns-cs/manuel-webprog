const User = require('../models/Users');

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const existingAdmin = await User.findOne({
    $or: [{ email: adminEmail }, { username: adminUsername }],
  });

  if (existingAdmin) {
    existingAdmin.role = 'admin';
    existingAdmin.type = 'admin';
    existingAdmin.isActive = true;
    await existingAdmin.save();
    console.log('Default admin account verified');
    return;
  }

  await User.create({
    firstName: 'Admin',
    lastName: 'User',
    age: '18',
    gender: 'other',
    contactNumber: '09000000000',
    email: adminEmail,
    role: 'admin',
    type: 'admin',
    username: adminUsername,
    password: process.env.ADMIN_PASSWORD || 'Admin1234!',
    address: 'Not provided',
    isActive: true,
  });

  console.log('Default admin account created');
};

module.exports = seedAdmin;
