module.exports = [
  {
    key: process.env.FLOWEY,
    discordID: "idk",
    nameColor: "#1da6ac",
    class: "developer",
    infiniteLevelUp: true,
    name: "Flowey",
    note: "F",
  },
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
    key: process.env.TESTING,
    discordID: undefined,
    nameColor: (() => {
      let hex = "" + parseInt(Math.random() * 16777216, 16);
      while (hex.length < 6) {
        hex = "0" + hex;
      }
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
