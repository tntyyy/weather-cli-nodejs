import { saveKeyValue, TOKENDICTIONARY } from './storage.service.js';
import { printError, printSuccess } from '../log.service.js';

export const saveToken = async token => {
  try {
    if (!token.length) {
      throw new Error('Токен не передан');
    }
    await saveKeyValue(TOKENDICTIONARY.token, token);
    printSuccess('Токен сохранён');
  } catch (e) {
    printError(e.message);
  }
};

export const saveCity = async city => {
  try {
    if (!city.length) {
      throw new Error('Город не передан');
    }
    await saveKeyValue(TOKENDICTIONARY.city, city);
    printSuccess('Город сохранён');
  } catch (e) {
    printError(e.message);
  }
};
