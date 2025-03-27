// Manages user authentication and database interactions.
const bcrypt = require('bcrypt');

module.exports = (couch) => {
  const db = couch.db.use('users');

  return {
    async createUser(username, password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { username, password: hashedPassword };
      await db.insert(user);
      return user;
    },

    async findUserByUsername(username) {
      const query = { selector: { username } };
      const result = await db.find(query);
      return result.docs[0];
    },
  };
};