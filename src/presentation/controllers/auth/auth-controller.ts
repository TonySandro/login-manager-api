import jwt from "jsonwebtoken";
import {
  badRequest,
  serverError,
  unauthorized,
  success,
} from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import env from "../../../main/config/env";

export class AuthController implements Controller {
  constructor() {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const authHeader = httpRequest.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        return unauthorized();
      }

      const accountUser = jwt.verify(token, env.jwtSecret, (err, decoded) => {
        if (err) {
          console.log(err);
          return badRequest(new Error("Invalid Token"));
        }
      });

      return success(accountUser);
    } catch (error) {
      return serverError(error);
    }
  }
}
