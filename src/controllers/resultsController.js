// import * as ResponseError from '../utils/responseErrorUtils';
// import * as ResultsService from '../services/resultsService';
// import * as Response from '../utils/responseUtils';

// // export const processWinningBets = async (req, res) => {
// //   const { id } = req.params;

// //   try {
// //     if (!id)
// //       return ResponseError.badRequestError('getResults: race id not specified', res, res.params);

// //     await ResultsService.updateResults(id);

// //     if (!results)
// //       return ResponseError.notFoundRequestError(`getResults: rsults not for race id ${id}`, res, res.params);

// //     return Response.updated(res);
// //   }
// //   catch (e) {
// //     return ResponseError.internalServerRequestError(`getResults: ${e.message}`, res);
// //   }
// // };
