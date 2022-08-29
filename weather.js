#!/usr/bin/env node

import {getArgs} from "./helpers/args.js";
import {printHelp, printSuccess, printError, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKENDICTIONARY} from "./services/storage.service.js";
import {getWeather, getIcon} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('Токен не передан')
        return;
    }
    try {
        await saveKeyValue(TOKENDICTIONARY.token, token);
        printSuccess('Токен сохранён');
    } catch (e) {
        printError(e.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('Город не передан')
        return;
    }
    try {
        await saveKeyValue(TOKENDICTIONARY.city, city);
        printSuccess('Город сохранён');
    } catch (e) {
        printError(e.message);
    }
}

const getForecast = async () => {
    try {
        const city = process.env.city ?? await getKeyValue(TOKENDICTIONARY.city)
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Неверно указан город');
        } else if (e?.response?.status === 401) {
            printError('Неверно указан токен')
        }
        else {
            printError(e.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        return printHelp();
    }

    if (args.s) {
        return saveCity(args.s);
    }

    if (args.t) {
        return saveToken(args.t)
    }

    return getForecast();
}

initCLI();