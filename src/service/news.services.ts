import axios from 'axios';
import NewsModel from '../model/news.model';

export const fetchCategoryNews = async (url: string): Promise<any> => {
  // fetching news from gnews api
  const response = await axios.get(url);
  console.log(response.headers);
  // returning news if exists
  if (response.status == 200) return response.data;
  // trying again due to limit restriction of 1 request per second if error is 429
  if (response.status == 429) return fetchCategoryNews(url);
  // returning null if error is not 429 or 200
  return null;
};
export const persistNewsInMongoDB = async (
  categoryNewsData: any,
  category: string
) => {
  return NewsModel.create({
    category,
    articles: categoryNewsData.articles,
    totalArticles: categoryNewsData.totalArticles,
  });
};
