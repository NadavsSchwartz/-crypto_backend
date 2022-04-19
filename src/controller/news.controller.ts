import { Request, Response } from 'express';
import { GetNewsByCategoryInput } from '../schema/news.schema';
import config from 'config';
import * as redis from '../redis';
import {
  fetchCategoryNews,
  persistNewsInMongoDB,
} from '../service/news.services';
import log from '../utils/logger';

const gnewsApiKey = config.get<string>('gnewsApiKey');

export const getNewsByCategoryHandler = async (
  req: Request<GetNewsByCategoryInput>,
  res: Response
) => {
  //getting category parameter from the request
  const category = req.params.category;
  if (!category) return res.status(400).send('Category is required');

  //getting news from redis if exists
  const isCategoryExistsOnRedisCache = await redis.get(category);
  if (isCategoryExistsOnRedisCache)
    return res.json(JSON.parse(isCategoryExistsOnRedisCache));

  try {
    //getting news from gnews api if doesn't exists on redis cache
    const url = `https://gnews.io/api/v4/search?q=${category}&token=${gnewsApiKey}&lang=en`;
    const news = await fetchCategoryNews(url);
    if (news) {
      //persisting news in mongodb
      const persistedNews = await persistNewsInMongoDB(news, category);
      //setting news in redis cache
      await redis.set(category, JSON.stringify(persistedNews), 'EX', 600);
      //returning news
      return res.json(persistedNews);
    }
    return res.status(500).send({ message: 'An Error occurred.' });
  } catch (error: any) {
    log.error(error);
    return res.status(500).send({ message: 'An Error occurred.' });
  }
};
