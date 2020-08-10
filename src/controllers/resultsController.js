import * as ResponseError from '../utils/responseErrorUtils';
import * as ResultsService from '../services/resultsService';
import * as Response from '../utils/responseUtils';

export const getResults = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id)
      return ResponseError.badRequestError('getResults: race id not specified', res, res.params);

    const results = await ResultsService.getResults(id);

    if (!results)
      return ResponseError.notFoundRequestError(`getResults: rsults not for race id ${id}`, res, res.params);

    return Response.ok(res, { results });
  }
  catch (e) {
    return ResponseError.internalServerRequestError(`getResults: ${e.message}`, res);
  }
};
