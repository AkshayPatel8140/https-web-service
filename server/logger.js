
import winston, { format, transports } from 'winston';
import { DateTime } from 'luxon';

const logFormat = format.printf(({ level, message }) => {
    const dataFormat = DateTime.now().toUTC()
    return `{time: ${dataFormat}, level: ${level}, message: ${message}}`
});

const getLoggerInstance = () => {
    const logger = winston.createLogger({
        level: 'info',
        format: format.json(),
        transports: [
            new transports.Console({ format: format.combine(format.colorize(), logFormat) })
        ]
    })
    return logger
}

export default getLoggerInstance;