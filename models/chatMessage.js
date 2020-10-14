import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true },
);

ChatMessageSchema.methods.toJSON = function() {
  return {
    id: this._id,
    senderId: this.senderId,
    fileId: this.clientId,
    message: this.message,
    date: this.date,
  };
};

mongoose.model('ChatMessage', ChatMessageSchema);
