// Define your Express routes here
// Check http://expressjs.com/fr/guide/routing.html for documentation

const UserController = require('./controllers/UserController');
const UserCreateForm = require('./forms/UserCreateForm');
const UserUpdateForm = require('./forms/UserUpdateForm');

const User = require('./models/User');

//
module.exports.init = (app) => {

  app.get('/', UserController.index);
  app.get('/create', UserController.create);
  app.get('/update/:id', UserController.update);

  // forms
  app.post('/', async (req, res) => {

    const form = new UserCreateForm().submit(req);

    if (form.errors) {
      console.log("form error", form.errors)
      req.flash('form', form);
      return res.redirect('/');
    }

    const user = await User.create({
      email: form.email,
      password: form.password,
      first_name: form.first_name,
      last_name: form.last_name,
      created_at: new Date()
    })
      .then(savedUser => {
        console.log("successful creation", savedUser);
        return res.redirect('/');
      })
      .catch(error => {
        console.log("error creating user", error);
      })

    console.log("created user", user);
  });

  app.put('/', async (req, res) => {

    const form = new UserUpdateForm().submit(req);

    if (form.errors) {
      req.flash('form', form);
      return res.redirect('/');
    }

    const user = await User.find(req.id);

    if (!user) {
      req.flash('form', form);
      return res.redirect('/');
    }

    user.update(req);

    return res.redirect('/');
  });
};
