import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  serverError,
  success,
  unauthorized,
  VerifyDecodedToken,
} from "./verify-token-protocols";

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
      if (!decodedToken.valid) {
        return badRequest(decodedToken.error);
      }

      return success(decodedToken);
    } catch (error) {
      return serverError(error);
    }
  }
}
