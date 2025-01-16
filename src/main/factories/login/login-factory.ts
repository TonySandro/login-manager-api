import env from "../../config/env";
import { makeLoginValidation } from "./login-validation-factory";
import {
  AccountMongoRepository,
  BcryptAdapter,
  Controller,
  DbAuthentication,
  JwtAdapter,
  LoginController,
} from "./login-factory-protocols";

export const makeLoginController = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  );

  return new LoginController(dbAuthentication, makeLoginValidation());
};
