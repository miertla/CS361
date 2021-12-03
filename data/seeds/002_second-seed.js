const trips = [
  {
    authorid: 1, location: 'Alaska', startdate: '2018-06-02', enddate: '2018-06-09', travelbuddies: 'Sean'
  },
  {
    authorid: 2, location: 'San Diego, California', startdate: '2021-09-30', enddate: '2021-10-03', travelbuddies: 'Jamie, Laurie, and Sean'
  }
];

exports.seed = function (knex, Promise) {
  return knex('trips').del()
  .then(() => {
    return knex('trips').insert(trips)
  })
};
