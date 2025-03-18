const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./User');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'users' }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model('User', userSchema);

class UserMongo extends User {
  constructor(user) {
    super(
      user._id,
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

  static async findById(id) {
    const user = await UserModel.findById(id);
    return user ? new UserMongo(user) : null;
  }

  async save() {
    const user = await UserModel.findByIdAndUpdate(this.id, this, { new: true, upsert: true });
    return new UserMongo(user);
  }

  async delete() {
    await UserModel.findByIdAndDelete(this.id);
  }
}

UserMongo.findAll = async function () {
  const users = await UserModel.find();
  return users.map((user) => new UserMongo(user));
};

module.exports = { UserMongo, UserModel }; 