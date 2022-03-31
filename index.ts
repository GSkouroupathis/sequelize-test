const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

(async () => {
  await sequelize.sync();
  const jane = await User.create({
    username: "'); DROP TABLE users--",
    birthday: new Date(1980, 6, 20)
  });
  console.log(jane.toJSON());
  console.log(jane.username);

  const users = await User.findAll();
  console.log(users.every(user => user instanceof User)); // true
  console.log("All users:", JSON.stringify(users, null, 2));

})();


