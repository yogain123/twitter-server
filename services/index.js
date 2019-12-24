const request = require("request");

exports.callTwitterApi = function(screen_name) {
  return new Promise(resolve => {
    var options = {
      method: "GET",
      url: `https://api.twitter.com/1.1/friends/list.json?screen_name=${screen_name}`,
      headers: {
        Authorization: `OAuth oauth_consumer_key=${process.env.oauth_consumer_key},oauth_token=${process.env.oauth_token},oauth_signature_method=${process.env.oauth_signature_method},oauth_timestamp=${process.env.oauth_timestamp},oauth_nonce=${process.env.oauth_nonce},oauth_version=${process.env.oauth_version},oauth_signature=${process.env.oauth_signature}`
      },
      json: true
    };
    request(options, function(error, response) {
      if (error) return resolve({ serverStatus: false });
      return resolve({ serverStatus: true, data: response.body.users });
    });
  });
};

exports.getMutualFriend = function(user1list, user2list) {
  user1list = user1list.map(item => item.screen_name);
  user2list = user2list.map(item => item.screen_name);
  return user1list.filter(item => user2list.includes(item));
};
