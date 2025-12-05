"""
Simple JSON DB helper: read/write `database.json` in this folder.
Provides atomic write and auto-increment helpers.
"""
import json
import os
from threading import Lock
from typing import Dict, Any

LOCK = Lock()
DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'database.json')


def _ensure_db():
    if not os.path.exists(DB_PATH):
        init = {"users": [], "anime": []}
        with open(DB_PATH, 'w', encoding='utf-8') as f:
            json.dump(init, f, indent=2)


def read_db() -> Dict[str, Any]:
    _ensure_db()
    with open(DB_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)


def write_db(data: Dict[str, Any]):
    _ensure_db()
    with LOCK:
        tmp = DB_PATH + '.tmp'
        with open(tmp, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
        os.replace(tmp, DB_PATH)


def next_user_id(db: Dict[str, Any]) -> int:
    users = db.get('users', [])
    if not users:
        return 1
    return max(u.get('id', 0) for u in users) + 1


def next_anime_id(db: Dict[str, Any]) -> int:
    anime = db.get('anime', [])
    if not anime:
        return 90001
    return max(a.get('id', 0) for a in anime) + 1
