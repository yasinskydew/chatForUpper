import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    login: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true },
);

UserSchema.methods.toJSON = function() {
  return {
    id: this._id,
    login: this.login,
    password: this.password,
  };
};

mongoose.model('User', UserSchema);
