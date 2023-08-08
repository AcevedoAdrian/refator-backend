import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usersCollection = 'users';

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
});

// ENCRIPTADO DE CONTRASENA
userSchema.pre(
  'save',
  async function (next) {
    // const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
);

// DESENCRIPTADO DE CONTRASENA
userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

mongoose.set('strictQuery', false);

const userModel = mongoose.model(usersCollection, userSchema);
export default userModel;
