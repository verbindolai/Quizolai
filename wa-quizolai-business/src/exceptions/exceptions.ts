export class StatusCodeError extends Error {

    code: number;

    constructor(msg: string, code: number) {
        super(msg);
        this.code = code;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, StatusCodeError.prototype);
    }

}