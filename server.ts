import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("rentroll_v3.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    neighborhood TEXT
  );

  CREATE TABLE IF NOT EXISTS units (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id INTEGER,
    unit_number TEXT NOT NULL,
    rent_amount REAL NOT NULL,
    status TEXT DEFAULT 'Vacant',
    FOREIGN KEY (property_id) REFERENCES properties(id)
  );

  CREATE TABLE IF NOT EXISTS tenants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit_id INTEGER,
    name TEXT NOT NULL,
    email TEXT,
    lease_start DATE,
    lease_end DATE,
    balance_due REAL DEFAULT 0,
    last_login_at TEXT,
    last_login_ip TEXT,
    FOREIGN KEY (unit_id) REFERENCES units(id)
  );

  CREATE TABLE IF NOT EXISTS maintenance_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit_id INTEGER,
    description TEXT NOT NULL,
    photo_url TEXT,
    status TEXT DEFAULT 'Pending Review',
    gm_notes TEXT,
    approval_notes TEXT,
    assigned_to TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES units(id)
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit_id INTEGER,
    sender TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (unit_id) REFERENCES units(id)
  );

  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit_id INTEGER,
    amount REAL NOT NULL,
    payment_date DATE NOT NULL,
    status TEXT DEFAULT 'Paid',
    FOREIGN KEY (unit_id) REFERENCES units(id)
  );
`);

// Migration: Add neighborhood column if it doesn't exist
try {
  db.exec("ALTER TABLE properties ADD COLUMN neighborhood TEXT");
} catch (e) {
  // Column likely already exists
}

// Migration: Add assigned_to and gm_notes to maintenance_requests if they don't exist
try {
  db.exec("ALTER TABLE maintenance_requests ADD COLUMN assigned_to TEXT");
} catch (e) {}
try {
  db.exec("ALTER TABLE maintenance_requests ADD COLUMN gm_notes TEXT");
} catch (e) {}

// Seed data if empty
const propertyCount = db.prepare("SELECT COUNT(*) as count FROM properties").get() as { count: number };
if (propertyCount.count === 0) {
  const insertProperty = db.prepare("INSERT INTO properties (name, address, neighborhood) VALUES (?, ?, ?)");
  const propId = insertProperty.run("3875 Ruby Street", "3875 Ruby St, Oakland, CA 94609", "Mosswood").lastInsertRowid;

  const insertUnit = db.prepare("INSERT INTO units (property_id, unit_number, rent_amount, status) VALUES (?, ?, ?, ?)");
  const insertTenant = db.prepare("INSERT INTO tenants (unit_id, name, email, lease_start, lease_end, balance_due, last_login_at, last_login_ip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  const insertPayment = db.prepare("INSERT INTO payments (unit_id, amount, payment_date, status) VALUES (?, ?, ?, ?)");

  // Generate 24 units across 3 floors
  for (let floor = 1; floor <= 3; floor++) {
    for (let unitIdx = 1; unitIdx <= 8; unitIdx++) {
      const unitNum = `${floor}${unitIdx.toString().padStart(2, '0')}`;
      const rent = 1800 + (floor * 200) + (Math.random() * 300);
      const isOccupied = Math.random() > 0.1; // 90% occupancy
      const status = isOccupied ? "Occupied" : "Vacant";

      const unitId = insertUnit.run(propId, unitNum, Math.round(rent), status).lastInsertRowid;

      if (isOccupied) {
        const names = ["Jordan Smith", "Alex Rivera", "Taylor Chen", "Morgan Lee", "Casey Wright", "Riley Davis", "Quinn Miller", "Skyler Rose"];
        const name = names[Math.floor(Math.random() * names.length)] + " " + unitNum;
        
        insertTenant.run(
          unitId, 
          name, 
          `${name.toLowerCase().replace(/ /g, '.')}@example.com`, 
          "2024-01-01", 
          "2025-01-01",
          Math.random() > 0.8 ? 150 : 0, // Some have balance
          new Date().toISOString(),
          `192.168.${floor}.${unitIdx}`
        );
        insertPayment.run(unitId, Math.round(rent), "2024-03-01", "Paid");
      }
    }
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // Cookie Check Endpoint
  app.get("/api/cookie-set", (req, res) => {
    res.cookie("dmc_cookie_test", "active", {
      secure: true,
      sameSite: "none",
      httpOnly: true,
      maxAge: 1000 * 60 * 10 // 10 minutes
    });
    res.json({ status: "cookie_set" });
  });

  app.get("/api/cookie-verify", (req, res) => {
    const isCookieActive = req.cookies.dmc_cookie_test === "active";
    res.json({ active: isCookieActive });
  });

  // API Routes
  app.get("/api/rent-roll", (req, res) => {
    const rows = db.prepare(`
      SELECT 
        u.id, 
        u.unit_number, 
        u.rent_amount, 
        u.status,
        t.name as tenant_name,
        t.lease_end,
        t.balance_due,
        t.last_login_at,
        t.last_login_ip,
        prop.neighborhood,
        p.payment_date as last_payment_date,
        p.status as last_payment_status
      FROM units u
      LEFT JOIN tenants t ON u.id = t.unit_id
      LEFT JOIN properties prop ON u.property_id = prop.id
      LEFT JOIN (
        SELECT unit_id, payment_date, status
        FROM payments
        GROUP BY unit_id
        HAVING payment_date = MAX(payment_date)
      ) p ON u.id = p.unit_id
    `).all();
    res.json(rows);
  });

  app.get("/api/messages/:unitId", (req, res) => {
    const messages = db.prepare("SELECT * FROM messages WHERE unit_id = ? ORDER BY created_at ASC").all(req.params.unitId);
    res.json(messages);
  });

  app.post("/api/messages", (req, res) => {
    const { unit_id, sender, content } = req.body;
    db.prepare("INSERT INTO messages (unit_id, sender, content) VALUES (?, ?, ?)").run(unit_id, sender, content);
    res.json({ status: "ok" });
  });

  app.get("/api/maintenance", (req, res) => {
    const requests = db.prepare(`
      SELECT m.*, u.unit_number 
      FROM maintenance_requests m
      JOIN units u ON m.unit_id = u.id
      ORDER BY m.created_at DESC
    `).all();
    res.json(requests);
  });

  app.get("/api/maintenance/:unitId", (req, res) => {
    const requests = db.prepare("SELECT * FROM maintenance_requests WHERE unit_id = ? ORDER BY created_at DESC").all(req.params.unitId);
    res.json(requests);
  });

  app.post("/api/maintenance", (req, res) => {
    const { unit_id, description, photo_url, assigned_to, gm_notes } = req.body;
    db.prepare(`
      INSERT INTO maintenance_requests (unit_id, description, photo_url, assigned_to, gm_notes, status) 
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(unit_id, description, photo_url, assigned_to, gm_notes, 'Pending Review');
    res.json({ status: "ok" });
  });

  app.patch("/api/maintenance/:id/status", (req, res) => {
    const { id } = req.params;
    const { status, gm_notes, approval_notes, assigned_to } = req.body;
    
    db.prepare(`
      UPDATE maintenance_requests 
      SET status = ?, 
          gm_notes = COALESCE(?, gm_notes), 
          approval_notes = COALESCE(?, approval_notes), 
          assigned_to = COALESCE(?, assigned_to),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(status, gm_notes, approval_notes, assigned_to, id);
    
    res.json({ status: "ok" });
  });

  app.patch("/api/rent-roll/:unitId/overdue", (req, res) => {
    const { unitId } = req.params;
    
    // 1. Update the latest payment status to 'Late'
    const latestPayment = db.prepare("SELECT id FROM payments WHERE unit_id = ? ORDER BY payment_date DESC LIMIT 1").get(unitId) as { id: number } | undefined;
    if (latestPayment) {
      db.prepare("UPDATE payments SET status = 'Late' WHERE id = ?").run(latestPayment.id);
    }

    // 2. Apply a $50 late fee to the tenant's balance
    db.prepare("UPDATE tenants SET balance_due = balance_due + 50 WHERE unit_id = ?").run(unitId);

    res.json({ status: "ok" });
  });

  app.get("/api/reports/unit/:unitId", (req, res) => {
    const { unitId } = req.params;
    
    const unit = db.prepare(`
      SELECT u.*, t.name as tenant_name, t.email as tenant_email, t.lease_start, t.lease_end, t.balance_due
      FROM units u
      LEFT JOIN tenants t ON u.id = t.unit_id
      WHERE u.id = ?
    `).get(unitId);

    if (!unit) {
      return res.status(404).json({ error: "Unit not found" });
    }

    const payments = db.prepare("SELECT * FROM payments WHERE unit_id = ? ORDER BY payment_date DESC").all(unitId);
    const maintenance = db.prepare("SELECT * FROM maintenance_requests WHERE unit_id = ? ORDER BY created_at DESC").all(unitId);
    const messages = db.prepare("SELECT * FROM messages WHERE unit_id = ? ORDER BY created_at ASC").all(unitId);

    res.json({
      unit,
      payments,
      maintenance,
      messages
    });
  });

  app.get("/api/stats", (req, res) => {
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_units,
        SUM(CASE WHEN status = 'Occupied' THEN 1 ELSE 0 END) as occupied_units,
        SUM(rent_amount) as total_potential_revenue
      FROM units
    `).get();
    res.json(stats);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
