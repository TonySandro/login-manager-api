import { Router } from "express";
import { adaptRoute } from "../adapters/express/express-route-adapter";
import { makeLoginController } from "../factories/login/login-factory";
import { makeVerifyTokenController } from "../factories/auth/auth-factory";
import { makeHealthCheckController } from "../factories/health/health-check";

export default (router: Router): void => {
  router.post("/login", adaptRoute(makeLoginController()));
  router.get("/auth", adaptRoute(makeVerifyTokenController()));
  router.get("/health", adaptRoute(makeHealthCheckController()));
};
