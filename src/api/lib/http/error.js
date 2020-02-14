

export class HttpError extends Error {

  constructor(response) {
    super(response.statusText);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }

    this.name = this.constructor.name;
    this.response = response;
    this.status = response.status;
  }

  toJSON() {
    return {name: this.name, status: this.status, message: this.message};
  }

}

HttpError.NOT_FOUND = 404;
