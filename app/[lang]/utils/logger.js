// logger.js

import winston from "winston";
const { combine, timestamp, json, colorize, simple } = winston.format;

const options = {
  File: {
    level: "info",
    filename: "app/[lang]/logs/app.log",
    handleExceptions: true,
    format: combine(timestamp(), json()),
    maxsize: 5 * 1024 * 1024,
    maxFile: 5,
  },

  console: {
    level: "debug",
    handleExceptions: true,
    format: combine(timestamp(), colorize(), simple()),
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.File),
    // new winston.transports.Console(options.console), // Optional: to log to the console as well
  ],
});

export { logger };
