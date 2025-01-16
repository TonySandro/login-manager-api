import env from "../../config/env";
import { makeLoginValidation } from "./login-validation-factory";
import {
  AccountManagerRepository,
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
  const accountManager = new AccountManagerRepository();
  const dbAuthentication = new DbAuthentication(
    accountManager,
    bcryptAdapter,
    jwtAdapter,
    accountManager
  );

  return new LoginController(dbAuthentication, makeLoginValidation());
};
