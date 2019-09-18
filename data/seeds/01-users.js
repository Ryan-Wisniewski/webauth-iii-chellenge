

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'Ryan', password: '$2a$10$BFDcGl0SWJdJmCrwC5SbQeFo.0CQf7Hg29mg..lsbOXYUc5S7nEhO'}
      ])
    })
};
