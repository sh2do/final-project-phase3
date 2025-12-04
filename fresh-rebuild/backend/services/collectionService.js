const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");
const COLLECTION_FILE = path.join(DATA_DIR, "collections.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  if (!fs.existsSync(COLLECTION_FILE))
    fs.writeFileSync(COLLECTION_FILE, JSON.stringify([]));
}

function loadCollections() {
  try {
    ensureDataDir();
    const raw = fs.readFileSync(COLLECTION_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load collections:", err.message);
    return [];
  }
}

function saveCollections(list) {
  try {
    ensureDataDir();
    fs.writeFileSync(COLLECTION_FILE, JSON.stringify(list, null, 2));
    return true;
  } catch (err) {
    console.error("Failed to save collections:", err.message);
    return false;
  }
}

function addToCollection(item) {
  const list = loadCollections();
  // avoid duplicates by mal_id
  const exists = list.find((i) => i.mal_id === item.mal_id);
  if (exists) return exists;
  list.unshift(item);
  saveCollections(list);
  return item;
}

module.exports = {
  loadCollections,
  saveCollections,
  addToCollection,
};
