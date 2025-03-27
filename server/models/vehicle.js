
//Handles vehicle data storage and CRUD operations.
 module.exports = (couch) => {
    const db = couch.db.use('vehicles');
  
    return {
      async createVehicle(vehicleData) {
        const vehicle = { ...vehicleData, createdAt: new Date() };
        await db.insert(vehicle);
        return vehicle;
      },
  
      async getAllVehicles() {
        const query = { selector: {} };
        const result = await db.find(query);
        return result.docs;
      },
  
      async updateVehicle(id, vehicleData) {
        const existing = await db.get(id);
        const updated = { ...existing, ...vehicleData };
        await db.insert(updated);
        return updated;
      },
  
      async deleteVehicle(id) {
        const doc = await db.get(id);
        await db.destroy(doc._id, doc._rev);
      },
    };
  };