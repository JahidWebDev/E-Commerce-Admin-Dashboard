function authMiddleware(req, res, next) {
  if (req.session && req.session.isAuth) {
    next();
  } else {
    return res.status(401).json({ error: "Unauthorized user" });
  }
}

module.exports = authMiddleware;