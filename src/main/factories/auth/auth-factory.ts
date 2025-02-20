import { VerifyToken } from "../../../data/usecases/verify-token/verify-token";
import { VerifyTokenController } from "../../../presentation/controllers/auth/verify-token-controller";
import env from "../../config/env";
import { Controller, JwtAdapter } from "../login/login-factory-protocols";

export const makeVerifyTokenController = (): Controller => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const decodeToken = new VerifyToken(jwtAdapter);
  return new VerifyTokenController(decodeToken);
};
