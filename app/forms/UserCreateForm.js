const { Form } = require('igo');
const UserFormSchema = require('./UserFormSchema');

class UserCreateForm extends Form(UserFormSchema) {

    validate(req) {
        req.checkBody('email', 'error.users.required_email').notEmpty();
    }
}

module.exports = UserCreateForm;