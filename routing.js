const express = require("express");
const router = express.Router();
const { callTwitterApi, getMutualFriend } = require("./services");

router.get("/", (req, res) => {
  res.send(process.env);
});

router.get("/friends/mutual/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  const [user1list, user2list] = await Promise.all([
    callTwitterApi(user1),
    callTwitterApi(user2)
  ]);

  if (
    user1list.data &&
    user2list.data &&
    user1list.serverStatus &&
    user2list.serverStatus
  ) {
    const mutualFriends = getMutualFriend(user1list.data, user2list.data);
    return res.json({ status: true, mutualFriends });
  }
  return res.json({ status: false, mutualFriends: [] });
});

module.exports = router;
