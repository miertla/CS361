const trips = [
  {
    authorId: 1, location: 'Alaska', startDate: '2018-06-02', endDate: '2018-06-09', travelBuddies: 'Sean'
  },
  {
    authorId: 2, location: 'San Diego, California', startDate: '2021-09-30', endDate: '2021-10-03', travelBuddies: 'Jamie, Laurie, and Sean'
  }
];

exports.seed = function (knex, Promise) {
  return knex('trips').del()
  .then(() => {
    return knex('trips').insert(trips)
  })
};
