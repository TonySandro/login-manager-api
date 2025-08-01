import {
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  Encrypter,
  HashComparer,
  Authentication,
  authenticationModel,
} from "./db-authentication-protocols";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth(authentication: authenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      authentication.email
    );

    if (!account.isConfirmed) return null;

    if (account) {
      const isValid = await this.hashComparer.compare(
        authentication.password,
        account.password
      );

      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id);
        await this.updateAccessTokenRepository.updateAccessToken(
          account.id,
          accessToken
        );

        return accessToken;
      }
    }

    return null;
  }
}
