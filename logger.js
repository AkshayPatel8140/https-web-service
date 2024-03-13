import winston, { format, transports } from 'winston';
import { DateTime } from 'luxon';

const logFormat = format.printf(({ level, message }) => {
    const dateFormat = DateTime.now().toUTC()
    return `{time: ${dateFormat} level: ${level} message: ${message}}`
});

export const getLoggerInstance = () => {
    const logger = winston.createLogger({
        level: 'info', // info, worn, error, debug
        format: format.json(),
        transports: [
            new transports.Console({ format: format.combine(format.colorize(), logFormat) })
        ]
    })

    return logger;
}


/* getLoggerInstance.info('message)
getLoggerInstance.worn('message)
getLoggerInstance.error('message)
getLoggerInstance.debug('message) */
