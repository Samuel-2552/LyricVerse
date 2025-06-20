//middleware auth.js

exports.isAdmin = (req, res, next) => {
    // Example: Assume req.user is set by previous auth middleware
    // and has a 'role' property
    if (req.user && (req.user.role === 'admin' || req.user.role === 'staff')) {
      return next();
    }
    return res.status(403).json({ error: 'Admins only' });
  };