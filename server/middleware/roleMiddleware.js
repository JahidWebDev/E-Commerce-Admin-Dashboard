function roleMiddleware(requiredRole) {
  return (req, res, next) => {

    if (!req.session.isAuth) {
      return res.status(401).json({ error: "Unauthorized user" });
    }

    if (req.session.user.role !== requiredRole) {
      return res.status(403).json({ error: "Access Denied" });
    }

    next();
  };
}

module.exports = roleMiddleware;