const wishList = [
  {
    authorid: 1, location: 'London', locationinfo: 'London is the capital and largest city of England and the United Kingdom. It stands on the River Thames in south-east England at the head of a 50-mile (80 km) estuary down to the North Sea, and has been a major settlement for two millennia. The City of London, its ancient core and financial centre, was founded by the Romans as Londinium and retains boundaries close to its medieval ones.'
  },
  {
    authorid: 2, location: 'Dublin', locationinfo: 'Dublin is the capital and largest city of Ireland. Situated on a bay on the east coast, at the mouth of the River Liffey, it lies within the province of Leinster. It is bordered on the south by the Dublin Mountains, a part of the Wicklow Mountains range. It has an urban area population of 1,173,179, while the population of the Dublin Region (traditional County Dublin) as of 2016 was 1,347,359. The population of the Greater Dublin Area was 1,904,806 per the 2016 census.'  
  }
];

exports.seed = function (knex, Promise) {
  return knex('wishlist').del()
  .then(() => {
    return knex('wishlist').insert(wishList)
  })
};