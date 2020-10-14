import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import errorhandler from 'errorhandler';
import routes from '../routes';
import './db';
import '../models';
import socketIo from 'socket.io';
const app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(methodOverride('_method'));
app.get('/', function(req, res) {
    res.send('Vovas chat mega soft is ready');
});
app.use(routes(app));
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(errorhandler());
const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port ' + server.address().port);
});
const io = socketIo(server);
export const socket = io.on('connection', socket => {
    console.log('socket connect');
});
module.exports = app;
