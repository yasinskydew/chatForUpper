import express from 'express';

export default (app, controllers) => {
  const router = express.Router();

  router
    .route('/')
    .post(controllers.chatMessage.create);
  router
    .route('/:orderId')
    .get(controllers.chats.getById);
  return router;
}
