function requireLogin(req, res, next) {
  if (req.session && req.session.bruker) {
    return next();
  }
  res.status(401).json({ feil: "Ikke innlogget" });
}

module.exports = requireLogin;
