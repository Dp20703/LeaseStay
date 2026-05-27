import User from "../../models/user.model.js";

// GENERATE UNIQUE USERNAME

const generateUniqueUsername = async (baseUsername) => {
  // CLEAN USERNAME

  let username = baseUsername
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");

  // FALLBACK

  if (!username) {
    username = "user";
  }

  // LIMIT LENGTH

  username = username.slice(0, 15);

  let finalUsername = username;

  let counter = 0;

  // CHECK EXISTING USERNAME

  while (await User.findOne({ userName: finalUsername })) {
    counter++;
    finalUsername = `${username}${counter}`;
  }

  return finalUsername;
};

export default generateUniqueUsername;
