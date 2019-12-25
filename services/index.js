const request = require("request");
const twi = require("twitter");
const config = require('../config');
var T = new twi(config);

// Set up your search parameters
var params = {
  q: '#nodejs',
  result_type: 'recent',
  lang: 'en',
  count: 200
}

exports.callTwitterApi = async function(screen_name) {
  let resultArray = [];
  let cursor = undefined;
  let getDataFromAPI;
  do{
    getDataFromAPI = await promiseTwitterData(screen_name,cursor);
    if(!getDataFromAPI.serverStatus){
      return { serverStatus: false }
    }
    else{
      resultArray = [...resultArray, ...getDataFromAPI.data];
      cursor = getDataFromAPI.cursor;
    }
  }
  while(getDataFromAPI.cursor!==0);

  return resultArray;
};

const promiseTwitterData = function(screen_name, cursor){
  params.screen_name = screen_name;
  cursor===undefined?"":params.cursor=cursor;
  return new Promise(resolve => {
    T.get('friends/list.json', params, function(err, data, response) {
      if(!err){
        return resolve({ serverStatus: true, data: data.users , cursor:data.next_cursor});
      } else {
        resolve({ serverStatus: false });
      }
    })
  });
}

exports.getMutualFriend = function(user1list, user2list) {
  user1list = user1list.map(item => item.screen_name);
  user2list = user2list.map(item => item.screen_name);
  return user1list.filter(item => user2list.includes(item));
};
