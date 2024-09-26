const User = require('../models/User');

module.exports.index = async (req, res) => {

    const users = await User.list();

    res.render('user/list', {users});
};

module.exports.create = (req, res) => {
    res.render('user/create');
};

module.exports.update = (req, res) => {
    res.render('user/update');
};
