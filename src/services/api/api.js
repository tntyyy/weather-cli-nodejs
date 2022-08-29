import { getKeyValue, TOKENDICTIONARY } from '../storage/storage.service.js';
import { getIcon, getWeather } from './api.service.js';
import { printError, printWeather } from '../log.service.js';

export const getForecast = async () => {
  try {
    const city = process.env.city ?? (await getKeyValue(TOKENDICTIONARY.city));
    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (e) {
    if (e?.response?.status === 404) {
      printError('Неверно указан город');
    } else if (e?.response?.status === 401) {
      printError('Неверно указан токен');
    } else {
      printError(e.message);
    }
  }
};
