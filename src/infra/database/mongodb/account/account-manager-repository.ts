import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from "../../../../data/protocols/database";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountModel } from "../../../../domain/usecases/add-account";

export class AccountManagerRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository
{
  async add(account: AddAccountModel): Promise<AccountModel> {
    //user-manager-api
    return null;
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    //user-manager-api
    return null;
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    //user-manager-api
  }
}
