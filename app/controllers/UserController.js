const UserCreateForm = require('../forms/UserCreateForm');
const UserUpdateForm = require('../forms/UserUpdateForm');

const User = require('../models/User');

module.exports.index = async (req, res) => {

    const users = await User.list();

    res.render('user/list', { users });
};

module.exports.create = (req, res) => {
    res.render('user/create');
};

module.exports.update = async (req, res) => {

    const userId = req.params.id;
    const user = await User.find(userId);

    if (!user)
        return res.redirect('/404');

    res.render('user/update', { user });
};

//

module.exports.createFromForm = async (req, res) => {

    const form = new UserCreateForm().submit(req);

    if (form.errors) {
        req.flash('form', form);
        return res.redirect('/500');
    }

    await User.create({
        ...form,
        created_at: new Date()
    })
        .then(() => res.redirect('/'))
        .catch(() => res.redirect('/500'))
}

module.exports.updateFromForm = async (req, res) => {

    const form = new UserUpdateForm().submit(req);

    if (form.errors) {
        req.flash('form', form);
        return res.redirect('/500');
    }

    const user = await User.find(form.id);

    if (!user) {
        req.flash('form', form);
        return res.redirect('/404');
    }

    user.update(form)
        .then(() => res.redirect('/'))
        .catch(() => res.redirect('/500'));
}

module.exports.delete = async (req, res) => {

    const user = await User.find(req.body.id);

    if (!user) {
        return res.redirect('/404');
    }

    await user.destroy();

    return res.send({done: true})
}