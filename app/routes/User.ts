import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  created_at: Date;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
