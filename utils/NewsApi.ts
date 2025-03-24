import { newsApikKey } from '@/utils/ApiKey';
import axios from 'axios';

// Endpoints
const apiBaseUrl = 'https://newsapi.org/v2';

const breakingNewsUrl = `${apiBaseUrl}/top-headlines?country=us&apiKey=${newsApikKey}`;

const recommendedNewsUrl = `${apiBaseUrl}/top-headlines?country=us&category=business&apiKey=${newsApikKey}`;

const discoverNewsUrl = (discover: string) =>
  `${apiBaseUrl}/top-headlines?country=us&category=${discover}&apiKey=${newsApikKey}`;

const searchNewsUrl = (query: string) =>
  `${apiBaseUrl}/everything?q=${query}&apiKey=${newsApikKey}`;

const newsApiCall = async (endpoints: string, params?: any) => {
  const options = {
    method: 'GET',
    url: endpoints,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const fetchBreakingNews = async () => {
  return await newsApiCall(breakingNewsUrl);
};

export const fetchRecommendedNews = async () => {
  return await newsApiCall(recommendedNewsUrl);
};

export const fetchDiscoverNews = async (discover: string) => {
  return await newsApiCall(discoverNewsUrl(discover));
};

export const fetchSearchNews = async (query: string) => {
  const endpoints = searchNewsUrl(query);
  return await newsApiCall(endpoints);
};
