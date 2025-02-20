import jwt from "jsonwebtoken";
import {
  badRequest,
  serverError,
  unauthorized,
  success,
} from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import env from "../../../main/config/env";
import { VerifyDecodedToken } from "../../../domain/usecases/verify-decoded-token";

export class VerifyTokenController implements Controller {
  constructor(private readonly verifyToken: VerifyDecodedToken) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const authHeader = httpRequest.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        return unauthorized();
      }

      const decodedToken = this.verifyToken.verify(token);

      return success(decodedToken);
    } catch (error) {
      return serverError(error);
    }
  }
}
