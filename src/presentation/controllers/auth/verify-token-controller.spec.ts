import { VerifyTokenController } from "./verify-token-controller";
import { HttpRequest } from "./../../protocols/http";
import {
  badRequest,
  serverError,
  success,
  unauthorized,
  VerifyDecodedToken,
} from "./verify-token-protocols";

const makeVerifyDecodedToken = (): VerifyDecodedToken => {
  class VerifyDecodedTokenStub implements VerifyDecodedToken {
    verify(token: string): any {
      return { id: "any_user_id" };
    }
  }
  return new VerifyDecodedTokenStub();
};

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    authorization: "Bearer any_token",
  },
});

interface SutTypes {
  sut: VerifyTokenController;
  verifyDecodedTokenStub: VerifyDecodedToken;
}

const makeSut = (): SutTypes => {
  const verifyDecodedTokenStub = makeVerifyDecodedToken();
  const sut = new VerifyTokenController(verifyDecodedTokenStub);
  return {
    sut,
    verifyDecodedTokenStub,
  };
};

describe("VerifyTokenController", () => {
  test("Should call VerifyDecodedToken with correct token", async () => {
    const { sut, verifyDecodedTokenStub } = makeSut();
    const verifySpy = jest.spyOn(verifyDecodedTokenStub, "verify");

    await sut.handle(makeFakeRequest());
    expect(verifySpy).toHaveBeenCalledWith("any_token");
  });

  test("Should return 401 if no token is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = { headers: {} };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(unauthorized());
  });

  test("Should return 200 if token is valid", async () => {
    const { sut, verifyDecodedTokenStub } = makeSut();
    jest.spyOn(verifyDecodedTokenStub, "verify").mockImplementationOnce(() => ({
      valid: true,
      payload: { id: "any_user_id" },
    }));

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(
      success({ valid: true, payload: { id: "any_user_id" } })
    );
  });

  test("Should return 500 if VerifyDecodedToken throws", async () => {
    const { sut, verifyDecodedTokenStub } = makeSut();
    jest.spyOn(verifyDecodedTokenStub, "verify").mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return 400 if token is invalid", async () => {
    const { sut, verifyDecodedTokenStub } = makeSut();
    jest.spyOn(verifyDecodedTokenStub, "verify").mockReturnValueOnce({
      valid: false,
      error: new Error("Invalid token"),
    });

    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(badRequest(new Error("Invalid token")));
  });
});
