import express from 'express';

export default (app, controllers) => {
  const router = express.Router();
  router
    .route('/')
    .post(controllers.users.create)
    .get(controllers.users.getAll);
  router
    .route('/:id')
    .get(controllers.users.getById);
  return router;
}
