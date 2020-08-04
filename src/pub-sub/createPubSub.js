import redis from 'redis';

import config from '../config';
import logger from '../logging';

export default (topic) => {
  const publisher = redis.createClient(config.REDIS_URI);
  const subscriber = redis.createClient(config.REDIS_URI);

  const publish = (message) => {
    publisher.publish(topic, JSON.stringify(message));
  };

  const subscribe = (cb) => {
    logger.info(`Subscribing to ${topic}`);
    subscriber.on('message', cb);
    subscriber.subscribe(topic);
  };

  const unsubscribe = (cb) => {
    logger.info(`Unsubscribing from ${topic}`);
    subscriber.unsubscribe();
    subscriber.removeListener('message', cb);
  };

  return { publish, subscribe, unsubscribe};
};
