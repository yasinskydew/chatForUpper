import chats from './chats';
import users from './users';
import chatMessage from './chatMessages';

export default app => ({
  chats: chats(app),
  users : users(app),
  chatMessage: chatMessage(app),
});
