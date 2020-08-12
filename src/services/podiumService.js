export const getPodium = async (raceDay) => {
  const raceDayWithPlayers = await raceDay.populate('players', 'name currentFunds').execPopulate();

  const players = raceDayWithPlayers.players.sort((previous, next) => {
    //Order descending
    return next.currentFunds - previous.currentFunds;
  });

  let currentRank = 1;
  let lastValue = 0;
  let podium = [];

  for (let i = 0; i < players.length; i++) {
    const entry = {
      player: players[i]
    };

    if (i == 0) {
      entry.rank = 1;
    }
    else if (players[i].currentFunds === lastValue) {
      entry.rank = currentRank;
    }
    else {
      currentRank++;
      entry.rank = currentRank;
    }

    lastValue = players[i].currentFunds;

    podium.push(entry);
  }

  return podium;
};
