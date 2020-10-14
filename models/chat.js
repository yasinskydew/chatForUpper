import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ['active', 'close'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true },
);

ChatSchema.methods.toJSON = function() {
  return {
    id: this._id,
    status: this.status,
    userId: this.userId,
    clientId: this.clientId,
    orderId: this.orderId,
  };
};

mongoose.model('Chat', ChatSchema);
