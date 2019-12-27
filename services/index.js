const request = require("request");
const twi = require("twitter");
const config = require("../config");
var T = new twi(config);

// Set up your search parameters
var params = {
  q: "#nodejs",
  result_type: "recent",
  lang: "en",
  count: 200
};

exports.callTwitterApi = async function(screen_name) {
  let resultArray = [];
  let cursor = undefined;
  let getDataFromAPI;
  let count = 1;
  do {
    getDataFromAPI = await promiseTwitterData(screen_name, cursor);
    console.log(`API HIT ${count} for ${screen_name}`);
    count++;
    if (!getDataFromAPI.serverStatus) {
      return { ...getDataFromAPI };
    } else {
      resultArray = [...resultArray, ...getDataFromAPI.data];
      cursor = getDataFromAPI.cursor;
    }
  } while (getDataFromAPI.cursor !== 0);

  return { serverStatus: true, data: resultArray };
};

const promiseTwitterData = function(screen_name, cursor) {
  params.screen_name = screen_name;
  cursor === undefined ? "" : (params.cursor = cursor);
  return new Promise(resolve => {
    T.get("friends/list.json", params, function(err, data, response) {
      if (!err) {
        return resolve({
          serverStatus: true,
          data: data.users,
          cursor: data.next_cursor
        });
      } else {
        if (err[0].code === 88)
          return resolve({ serverStatus: false, message: err[0].message });
        return resolve({ serverStatus: false });
      }
    });
  });
};

exports.getMutualFriend = function(user1list, user2list) {
  let res = user1list.filter(({ screen_name }) =>
    user2list.find(i => i.screen_name === screen_name)
  );
  return res;
};
