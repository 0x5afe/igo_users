// Define your Express routes here
// Check http://expressjs.com/fr/guide/routing.html for documentation

const UserController = require('./controllers/UserController');

//
module.exports.init = (app) => {

  app.get('/', UserController.index);
  app.get('/create', UserController.create);
  app.get('/update/:id', UserController.update);

  // forms
  app.post('/', UserController.createFromForm);
  app.post('/update', UserController.updateFromForm);
  app.delete('/', UserController.delete);
};
