import logger from '../logging';

export const logError = (message, params = null) => {
  logger.warn(message);

  if (params)
    logger.warn(JSON.stringify(params, null, 2));
};
