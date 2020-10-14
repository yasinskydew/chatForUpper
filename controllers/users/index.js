import mongoose from 'mongoose';

export default app => {
  const User = mongoose.model('User');
  const create = async (req, res, next) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      return res.json(newUser);
    } catch (err) {
      next(err.message)
    }
  }

  const getById = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if(!user) {
        return res.sendStatus(404);
      }
      return res.json(user);
    } catch (err) {
      next(err.message)
    }
  }

  const getAll = async (req, res, next) => {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      next(err.message)
    }
  }

  return {
    create,
    getById,
    getAll,
  }
}
