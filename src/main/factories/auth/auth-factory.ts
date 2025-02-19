import { AuthController } from "../../../presentation/controllers/auth/auth-controller";
import { Controller } from "../login/login-factory-protocols";

export const makeAuthController = (): Controller => {
  return new AuthController();
};
