const request = require("request");
const twi = require("twitter");
const config = require('../config');
var T = new twi(config);

// Set up your search parameters
var params = {
  q: '#nodejs',
  count: 10,
  result_type: 'recent',
  lang: 'en',
}

exports.callTwitterApi = function(screen_name) {
  params.screen_name = screen_name;
  return new Promise(resolve => {
    T.get('friends/list.json', params, function(err, data, response) {
      if(!err){
        return resolve({ serverStatus: true, data: data.users });
      } else {
        resolve({ serverStatus: false });
      }
    })
  });
};

exports.getMutualFriend = function(user1list, user2list) {
  user1list = user1list.map(item => item.screen_name);
  user2list = user2list.map(item => item.screen_name);
  return user1list.filter(item => user2list.includes(item));
};
