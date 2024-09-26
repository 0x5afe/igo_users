const Model  = require('igo').Model;

const schema = {
  table:    'users',
  columns:  [
    'id',
    'email',
    'password',
    'first_name',
    'last_name',
    'created_at'
  ]
};

class User extends Model(schema) {
  //override constructor if needed
  constructor(values) {
    super(values);
  }

  name() {
    return this.first_name + ' ' + this.last_name;
  }
};

module.exports = User;