import mongoose from 'mongoose';

export default app => {
  const Chat = mongoose.model('Chat');

  const create = async (req, res, next) => {
    try {
      const newChat = new Chat(req.body);
      await newChat.save();
      return res.json(newChat);
    } catch (err) {
      next(err.message)
    }
  }

  const getById = async (req, res, next) => {
    try {
      const chat = await Chat.aggregate([
        { $match: { orderId: mongoose.Types.ObjectId(req.params.orderId) } },
        {
          $lookup: {
            from: 'chatmessages',
            localField: '_id',
            foreignField: 'chatId',
            as: 'messages',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'clientId',
            foreignField: '_id',
            as: 'clientId',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userId',
          },
        },
        {
          $addFields: {
            clientId: { $first: '$clientId'},
            userId: { $first: '$userId'}
          }
        }
      ]);
      return res.json(chat);
    } catch (err) {
      next(err.message)
    }
  }

  return {
    create,
    getById,
  }
}
