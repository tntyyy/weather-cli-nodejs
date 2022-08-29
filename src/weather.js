#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp, printError, printWeather } from './services/log.service.js';
import { saveCity, saveToken } from './services/storage/storage.js';
import { getForecast } from './services/api/api.js';

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }

  if (args.s) {
    return saveCity(args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  return getForecast();
};

initCLI();
