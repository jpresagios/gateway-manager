import { createLogger, format, transports } from "winston";
const { combine, timestamp, colorize, printf } = format;

import { SPLAT } from "triple-beam";
import * as _ from "lodash";

function formatObject(param) {
  if (_.isObject(param)) {
    return JSON.stringify(param);
  }
  return param;
}

const logFormat = printf((info) => {
  const splat = info[SPLAT] || [];

  const message = formatObject(info.message);
  const rest = splat.map(formatObject).join(" ");

  return `[${info.level}] ${info.timestamp}: ${message} ${rest}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    colorize(),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: logFormat,
    })
  );
}

export default logger;
