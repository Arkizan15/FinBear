import { readDB } from "../config/database.js";

export const getAllModules = async (req, res) => {
  try {
    const db = await readDB();
    res.json(db.modules);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getModuleById = async (req, res) => {
  try {
    const db = await readDB();
    const module = db.modules.find((m) => String(m.id) === String(req.params.id));
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }
    res.json(module);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
