import express from "express";
import db from "../db/index.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const { rows: restaurants } = await db.query("SELECT * FROM restaurants");
    return res.json(restaurants);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    return res.status(500).json({ error: message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { rows: restaurants } = await db.query(
      "SELECT * FROM restaurants WHERE id = $1",
      [req.params.id]
    );
    if (!restaurants[0]) {
      return res.status(404).json({
        error: "Could not retrieve restaurant with specified ID"
      });
    }
    return res.json(restaurants[0]);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return res
      .status(404)
      .json({ error: "Could not retrieve restaurant with specified ID" });
  }
});

router.post("/", async (req, res) => {
  const { name, location, priceRange } = req.body;
  try {
    const { rows: restaurants } = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [name, location, priceRange]
    );
    return res.json(restaurants[0]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    return res.status(500).json({ error: message });
  }
});

router.put("/:id", async (req, res) => {
  const {
    body: { name, location, price_range },
    params: { id }
  } = req;
  if (
    typeof name !== "string" ||
    typeof location !== "string" ||
    typeof price_range !== "number"
  ) {
    return res.status(400).json({ error: "Inalid properties" });
  }
  try {
    const { rows: restaurants } = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [name, location, price_range, id]
    );
    return res.json(restaurants[0]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    return res.status(500).json({ error: message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
    return res.status(204).json();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    return res.status(500).json({ error: message });
  }
});

export default router;
