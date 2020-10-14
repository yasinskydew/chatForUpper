import express from 'express';
import { cloneDeep } from 'lodash';
import allControllers from '../controllers';
import chats from './chats';
import users from './users';
import chatMessages from "./chatMessages";

export default app => {
  const router = express.Router();
  const controllers = allControllers(app);
  router.use('/api/chats', chats(app, controllers));
  router.use('/api/users', users(app, controllers));
  router.use('/api/chatmessages', chatMessages(app, controllers));

  router.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
      return res.status(422).json({
        errors: Object.keys(err.errors).reduce((errors, key) => {
          const clonedError = cloneDeep(errors);
          clonedError[key] = err.errors[key].message;

          return clonedError;
        }, {}),
      });
    }

    return next(err);
  });

  return router;
};
