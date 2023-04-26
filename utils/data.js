const username = [
  'UserNameOne',
  'UserNameTwo',
  'UserNameThree',
];

const email = [
  'UserNameOne@gmail.com',
  'UserNameTwo@gmail.com',
  'UserNameThree@gmail.com',
];

const thoughts = [
  'Thought One',
  'Thought Two',
  'Thought Three',
];

const friends = [
  'Friend One',
  'Friend Two',
  'Friend Three',
];

const user = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUser = () =>
  `${getRandomArrItem(user)} ${getRandomArrItem(user)}`;

// Function to generate random thoughts that we can add to the database. Includes thought reactions.
const getRandomThought = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      published: Math.random() < 0.5,
      description: getRandomArrItem(descriptionsBodies),
      advertiserFriendly: Math.random() < 0.5,
      reactions: [...getThoughtReactions(3)],
    });
  }
  return results;
};

// Create the reactions that will be added to each thought
const getThoughtReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(possibleReactions);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(possibleReactions),
      user: getRandomName(),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThought, getRandomThought };
