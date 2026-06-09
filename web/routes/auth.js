const express = require("express");
const bcrypt  = require("bcryptjs");
const pool    = require("../db/connection");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { brukernavn, passord } = req.body;

  if (!brukernavn || !passord) {
    return res.status(400).json({ feil: "Brukernavn og passord kreves" });
  }

  const [rows] = await pool.query(
    `SELECT b.*, bed.navn AS bedrift_navn, bed.vlan, bed.ip_nett, bed.gateway
     FROM brukere b
     JOIN bedrifter bed ON b.bedrift_id = bed.id
     WHERE b.brukernavn = ?`,
    [brukernavn]
  );

  if (rows.length === 0) {
    return res.status(401).json({ feil: "Feil brukernavn eller passord" });
  }

  const bruker = rows[0];
  const gyldig = await bcrypt.compare(passord, bruker.passord_hash);

  if (!gyldig) {
    return res.status(401).json({ feil: "Feil brukernavn eller passord" });
  }

  req.session.bruker = {
    id:           bruker.id,
    brukernavn:   bruker.brukernavn,
    bedrift_id:   bruker.bedrift_id,
    bedrift_navn: bruker.bedrift_navn,
  };

  res.json({ ok: true, bedrift: bruker.bedrift_navn });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

module.exports = router;
