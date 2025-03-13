Project structure:

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
- The initial JavaScript-based Vehicle Management System was **refactored using ES6 classes** for better modularity.
- Each vehicle type (cars, motorcycles, trucks) was given a **dedicated class** with inheritance.

### 2. **Backend Development**
We developed multiple backend implementations using different databases:

✅ **MongoDB (Mongoose)** – NoSQL, document-based, flexible schema.
✅ **MariaDB (MySQL2)** – SQL, structured, relational.
✅ **PostgreSQL (pg)** – SQL, powerful for complex queries.
✅ **CouchDB** – NoSQL, distributed, great for offline sync.

Each backend supports **CRUD operations**, allowing:
- Adding new vehicles
- Fetching vehicle lists
- Updating vehicle details
- Deleting vehicles

### 3. **Frontend Integration with CRUD APIs**
- The frontend makes **REST API calls** to interact with the backend.
- Used **fetch()** and **async/await** to handle data retrieval and form submissions.
- Depending on the database, **data formatting and error handling** differ slightly (e.g., SQL uses structured responses, while NoSQL can return nested documents).

### 4. **Extending to Motorcycles & Trucks**
- The system was extended to handle **motorcycles and trucks** by updating:
  - **Database schemas/tables**
  - **Class-based models in the frontend**
  - **API endpoints to differentiate vehicle types**

### 5. **Database Comparison for Frontend Impact**
- MongoDB & CouchDB allow **flexible JSON structures**, making frontend development easier.
- MariaDB & PostgreSQL enforce strict schemas, requiring **form validation adjustments**.
- CouchDB has **offline sync with PouchDB**, beneficial for mobile/web hybrid apps.

### 6. **Final Recommendations**
- **Use MongoDB** for scalable, flexible applications.
- **Use MariaDB** if relational integrity is critical.
- **Use PostgreSQL** for advanced querying needs.
- **Use CouchDB** for offline-first applications.

🚀 **Let me know if you need additional improvements or documentation formatting!**
