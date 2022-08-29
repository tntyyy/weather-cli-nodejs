#!/usr/bin/env node

import {getArgs} from "./helpers/args.js";
import {printHelp, printSuccess, printError} from "./services/log.service.js";
import {saveKeyValue, TOKENDICTIONARY} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";

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

const initCLI = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        printHelp();
    }

    if (args.s) {
        // Save city
    }

    if (args.t) {
        return saveToken(args.t)
    }

    getWeather('kazan');
}

initCLI();