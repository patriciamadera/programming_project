const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbSQL');
const User = require('./User');
const bcrypt = require('bcryptjs');

const UserSQLModel = sequelize.define(
  'UserSQL',
  {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.ENUM('admin', 'customer'), defaultValue: 'customer' },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { timestamps: true }
);

UserSQLModel.beforeSave(async (user) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

class UserSQL extends User {
  constructor(user) {
    super(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.phoneNumber,
      user.role,
      user.isActive,
      user.createdAt,
      user.updatedAt
    );
  }

  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  static async findById(id) {
    const user = await UserSQLModel.findByPk(id);
    return user ? new UserSQL(user) : null;
  }

  async save() {
    const [user] = await UserSQLModel.upsert({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
      role: this.role,
      isActive: this.isActive,
    });
    return new UserSQL(user);
  }

  async delete() {
    await UserSQLModel.destroy({ where: { id: this.id } });
  }
}

UserSQL.findAll = async function () {
  const users = await UserSQLModel.findAll();
  return users.map((user) => new UserSQL(user));
};

module.exports = { UserSQL, UserSQLModel };
