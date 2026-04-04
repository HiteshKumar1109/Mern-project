const User = require('../models/User');

// @desc    Get admin platform stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    const total_users = await User.countDocuments();
    
    // Placeholder stats for other entities until they are created
    res.json({
      total_users,
      total_tests: 12,
      total_attempts: 154,
      total_affairs: 45
    });
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    
    // Map the users to match the frontend expectations (created_at instead of createdAt)
    const formattedUsers = users.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.createdAt
    }));

    res.json({ users: formattedUsers });
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
};

module.exports = {
  getStats,
  getUsers
};
