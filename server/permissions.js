module.exports = [
  {
    key: process.env.MLG,
    discordID: "imnotgivingyouthisinformationlol",
    nameColor: "#00ff00",
    class: "developer",
    infiniteLevelUp: true,
    name: "MLG",
    note: "That one unofficial community manager from the sandbox server #wpd. Also a co-developer of tank-dev.glitch.me.",
  },
  {
    key: process.env.FLOWEY,
    discordID: "hmmm",
    nameColor: "#1da6ac",
    class: "developer",
    infiniteLevelUp: true,
    name: "Flowey",
    note: "F",
  },
  {
    key: process.env.TESTING,
    discordID: "I_don't_use_discord",
    nameColor: (() => {
      // Select random color
      let hex = "" + parseInt(Math.random() * 16777216, 16);
      while (hex.length < 6) {
        // Make it 6 digit
        hex = "0" + hex;
      }
      // Return it
      return "#" + hex;
    })(),
    class: "developer",
    infiniteLevelUp: true,
    name: "testing",
    note: undefined,
  },
  {
    key: process.env.TOKEN_4,
    discordID: "0",
    nameColor: "#ffffff",
    class: "developer",
    infiniteLevelUp: true,
    name: "unnamed#0000",
    note: "note here",
  },
  {
    key: process.env.alpha,
    discordID: "0",
    nameColor: "#ffffff",
    class: "developer",
    infiniteLevelUp: true,
    name: "unnamed#0000",
    note: "note here",
  },
];
