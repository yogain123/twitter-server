const express = require("express");
const router = express.Router();
const { callTwitterApi, getMutualFriend } = require("./services");

router.get("/", (req, res) => {
  console.log("inside route /");
  res.send("Hello World !!");
});

router.get("/friends/mutual/:user1/:user2", async (req, res) => {
  console.log("inside route /friends/mutual");
  const { user1, user2 } = req.params;
  const [user1list, user2list] = await Promise.all([
    callTwitterApi(user1),
    callTwitterApi(user2),
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
  if (user1list.message || user2list.message) {
    return res.json({
      status: false,
      mutualFriends: [],
      message: user1list.message,
    });
  }

  res.cookie("name", "yogendra");
  res.cookie("age", 26);

  return res.json({ status: false, mutualFriends: [] });
});

module.exports = router;
