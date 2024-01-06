import { ResponseStruct } from "../models";

export class ResponseBuilder<T> {
  private message?: string;
  private data?: T;
  private errors?: string[];

  constructor(message?: string, data?: T, errors?: string[]) {
    this.message = message;
    this.data = data;
    this.errors = errors;
  }

  setErrors(errors: string[]): ResponseBuilder<T> {
    this.errors = errors;
    return this;
  }

  setMessage(msg: string): ResponseBuilder<T> {
    this.message = msg;
    return this;
  }

  setData(data: T): ResponseBuilder<T> {
    this.data = data;
    return this;
  }

  build(): ResponseStruct<T> {
    return {
      message: this.message,
      data: this.data,
      errors: this.errors,
    };
  }
}
