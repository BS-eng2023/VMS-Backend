Project structure:
vehicle-management/
│── backend/                   # Backend (Node.js, Express, JSON DB)
│   │── server.js               # Main server file
│   │── data/                   # Database (JSON files or SQLite)
│   │── routes/                 # API routes
│       │── vehicles.js         # Routes for managing vehicles
│   │── controllers/            # Business logic
│       │── vehicleController.js
│   │── models/                 # Data models (optional if using a database)
│       │── vehicleModel.js
│   │── package.json            # Node.js dependencies
│── frontend/                  # Frontend (Vanilla JS, HTML, CSS)
│   │── index.html              # Main homepage
│   │── vehicle.html            # Vehicle detail page
│   │── css/                    # Stylesheets
│   │   │── styles.css          # Main CSS file
│   │── js/                     # JavaScript logic
│   │   │── app.js              # Main logic
│   │   │── api.js              # Fetch API functions
│   │   │── filters.js          # Search & filter logic
│   │── assets/                 # Images, icons
│── README.md                   # Documentation

Frontend

Bachend

# Comparison of MongoDB, MariaDB, PostgreSQL, and CouchDB for Vehicle Management System

## 1️⃣ MongoDB (Mongoose) → NoSQL Document-Based

✅ **Effect on Frontend**:
- **Flexible Data Structure**: The frontend can send or receive **dynamic JSON data**, allowing more flexibility in form design.
- **Faster Reads & Writes**: Since MongoDB is a NoSQL document store, it can handle large amounts of unstructured data efficiently.
- **Embedded Data Model**: Can store entire vehicle details (e.g., owner, service history) as nested objects, reducing the need for multiple queries.
- **Good for real-time applications**, thanks to its support for change streams.

⚠ **Challenges**:
- **More complex queries require aggregation pipelines**.
- **Not great for relational data**: Foreign keys don’t exist, so you might have **data duplication** instead of relational integrity.

**Best for**: **Dynamic web apps, real-time applications, and flexible schema requirements.**

---

## Backend Comparison Table (Including CouchDB)

| **Feature**       | **MongoDB (Mongoose)** | **MariaDB (MySQL2)** | **PostgreSQL (pg)** | **CouchDB** |
|------------------|------------------|------------------|------------------|---------------------|
| **Type**          | NoSQL (Document-based) | SQL (Relational) | SQL (Relational) | NoSQL (Document-based) |
| **Data Model**    | JSON-like Documents | Structured tables | Structured tables & JSON fields | Document-based (JSON) |
| **Schema Handling** | Flexible (No predefined schema) | Schema is required | Schema required but supports JSON | Schema-less |
| **Performance**    | Fast reads/writes, good for scaling | Fast transactions, great for structured data | Strong consistency, advanced indexing | Optimized for distributed setups |
| **Scalability**    | Horizontally scalable (sharding) | Vertical scaling (MySQL replication) | Horizontal & vertical scaling | Master-Master replication, excellent for distributed environments |
| **Querying**       | Flexible NoSQL queries | SQL-based, structured queries | Advanced querying & analytics | Uses MapReduce for indexing |
| **Offline Support** | No built-in offline sync | No built-in offline sync | No built-in offline sync | Yes, with built-in PouchDB support |
| **Best For** | Real-time apps, dynamic web apps | Structured data, relational integrity | Complex queries, analytics-heavy applications | Mobile, offline-first applications |
| **Challenges**     | Complex queries require aggregation pipelines | Schema changes require migrations | Complex SQL queries can be slow if not optimized | Slower queries, needs conflict resolution |

---

## Full Project Development Summary

### 1. **Project Redesign with Classes**
```javascript
class Vehicle {
  constructor(model, type, mileage) {
    this.model = model;
    this.type = type;
    this.mileage = mileage;
  }
  displayInfo() {
    return `${this.model} (${this.type}) - Mileage: ${this.mileage}`;
  }
}

class Car extends Vehicle {
  constructor(model, mileage, seats) {
    super(model, 'Car', mileage);
    this.seats = seats;
  }
}

class Motorcycle extends Vehicle {
  constructor(model, mileage, hasSidecar) {
    super(model, 'Motorcycle', mileage);
    this.hasSidecar = hasSidecar;
  }
}
```

### 2. **Frontend Methods for API Calls**
```javascript
async function fetchVehicles() {
  const response = await fetch('/vehicles');
  return await response.json();
}

async function addVehicle(vehicle) {
  await fetch('/vehicles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vehicle),
  });
}
```

---

## 3. **Backend Implementations for Four Databases**

### **MongoDB (Mongoose) Backend**
```javascript
const mongoose = require('mongoose');
const express = require('express');
const Vehicle = require('./models/Vehicle');

mongoose.connect('mongodb://localhost:27017/vehicles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());

app.post('/vehicles', async (req, res) => {
  const vehicle = new Vehicle(req.body);
  await vehicle.save();
  res.send(vehicle);
});

app.get('/vehicles', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.send(vehicles);
});
```

### **MariaDB (MySQL2) Backend**
```javascript
const mysql = require('mysql2');
const express = require('express');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vehicles_db'
});

const app = express();
app.use(express.json());

app.post('/vehicles', (req, res) => {
  const { model, type, mileage } = req.body;
  db.query('INSERT INTO vehicles (model, type, mileage) VALUES (?, ?, ?)', [model, type, mileage], (err) => {
    if (err) throw err;
    res.send('Vehicle added');
  });
});
```

### **PostgreSQL (pg) Backend**
```javascript
const { Client } = require('pg');
const express = require('express');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'vehicles_db',
  password: 'password',
  port: 5432,
});

client.connect();
const app = express();
app.use(express.json());

app.post('/vehicles', async (req, res) => {
  const { model, type, mileage } = req.body;
  await client.query('INSERT INTO vehicles (model, type, mileage) VALUES ($1, $2, $3)', [model, type, mileage]);
  res.send('Vehicle added');
});
```

### **CouchDB Backend (using Nano)**
```javascript
const nano = require('nano')('http://admin:password@localhost:5984');
const express = require('express');
const db = nano.db.use('vehicles');

const app = express();
app.use(express.json());

app.post('/vehicles', async (req, res) => {
  const response = await db.insert(req.body);
  res.send(response);
});

app.get('/vehicles', async (req, res) => {
  const { rows } = await db.list({ include_docs: true });
  res.json(rows.map(row => row.doc));
});
```

---
