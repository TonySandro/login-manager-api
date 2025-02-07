import {
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from "../../../data/protocols/database";
import { AccountModel } from "../../../domain/models/account";
import { axiosAdapter } from "../../../main/adapters/axios/axios-adapter";

export class AccountManagerRepository
  implements LoadAccountByEmailRepository, UpdateAccessTokenRepository
{
  async loadByEmail(email: string): Promise<AccountModel> {
    return (
      await axiosAdapter.get("/get-account-by-email", {
        data: { email },
      })
    ).data;
  }

  async updateAccessToken(id: string, accessToken: string): Promise<string> {
    return await axiosAdapter.post(`/update-access-token`, {
      id,
      accessToken,
    });
  }
}
