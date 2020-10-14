import mongoose from 'mongoose';
import { socket } from '../../app/app';
export default app => {
  const ChatMessage = mongoose.model('ChatMessage');
  const create = async (req, res, next) => {
    try {
      const newChatMessage = new ChatMessage(req.body);
      await newChatMessage.save();
      socket.emit('newMessage', newChatMessage);
      return res.json(newChatMessage);
    } catch (err) {
      next(err.message)
    }
  }

  return {
    create,
  }
}
