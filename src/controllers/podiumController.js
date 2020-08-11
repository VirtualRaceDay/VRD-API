import * as RaceDayService from '../services/raceDayService';
import * as PodiumService from '../services/podiumService';
// import * as PlayerService from '../services/playerService';
import * as ResponseError from '../utils/responseErrorUtils';
import * as Response from '../utils/responseUtils';
// import logger from '../logging';

// import PlayerListPubSub from '../pub-sub/playerList';

export const getPodium = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id || id == 'undefined')
      return ResponseError.badRequestError(`getPodium: id not specified from ${req.ip}}`, res, req.params);

    let raceDay = await RaceDayService.getRaceDayById(id);

    if (!raceDay)
      return ResponseError.notFoundRequestError(`getPodium: race day with id of ${id} not found`, res, req.params);

    let podium = await PodiumService.getPodium(raceDay);
    return Response.ok(res, podium);
  }
  catch (e) {
    return ResponseError.internalServerRequestError(`getPodium: ${e}`, res);
    //return ResponseError.internalServerRequestError(`getPodium: ${e.message}`, res);
  }
};
