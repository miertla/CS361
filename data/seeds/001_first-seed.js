const profiles = [
  {
    firstName: 'John', lastName: 'Smith', email: 'testemail@gmail.com', username: 'JohnS13', password: 'testpword1234'
  },
  {
    firstName: 'Sara', lastName: 'Young', email: 'syoung@gmail.com', username: 'Syoung', password: 'testpword2021'
  }  
];

exports.seed = function (knex, Promise) {
  return knex('profiles').del()
  .then(() => {
    return knex('profiles').insert(profiles)
  })
};