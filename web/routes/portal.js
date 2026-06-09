const express      = require("express");
const pool         = require("../db/connection");
const requireLogin = require("../middleware/requireLogin");

const router = express.Router();

router.get("/api/meg", requireLogin, (req, res) => {
  res.json(req.session.bruker);
});

router.get("/api/docs", requireLogin, async (req, res) => {
  const [rows] = await pool.query(
    "SELECT id, tittel, innhold, opprettet FROM dokumentasjon WHERE bedrift_id = ? ORDER BY opprettet DESC",
    [req.session.bruker.bedrift_id]
  );
  res.json(rows);
});

router.get("/api/nettverk", requireLogin, async (req, res) => {
  const [rows] = await pool.query(
    "SELECT navn, vlan, ip_nett, gateway FROM bedrifter WHERE id = ?",
    [req.session.bruker.bedrift_id]
  );
  res.json(rows[0]);
});

module.exports = router;
