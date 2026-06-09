const express = require("express");
const session = require("express-session");
const path    = require("path");

const authRoutes   = require("./routes/auth");
const portalRoutes = require("./routes/portal");

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret:            process.env.SESSION_SECRET || "hemmelignoekkel123",
  resave:            false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 },
}));

app.use(authRoutes);
app.use(portalRoutes);

app.listen(PORT, () => {
  console.log(`Server kjører på http://localhost:${PORT}`);
});
