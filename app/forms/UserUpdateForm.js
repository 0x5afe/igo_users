const { Form } = require('igo');
const UserFormSchema = require('./UserFormSchema');

class UserUpdateForm extends Form(UserFormSchema) {
    validate(req) {
        req.checkBody('email', 'error.users.required_email').notEmpty();
    }
}

module.exports = UserUpdateForm;