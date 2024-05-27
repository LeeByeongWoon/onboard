export default class CustomError extends Error {
    constructor(
        message?: string,
        public name: string = Error.name,
        cause: string = ''
    ) {
        super(message);
        this.name = name;
        this.cause = cause;

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = new Error(message).stack;
        }
    }
}
