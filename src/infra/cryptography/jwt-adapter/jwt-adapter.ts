import { Encrypter } from "../../../data/protocols/cryptography/encrypter";
import { Decoded } from "../../../data/protocols/cryptography/decoded";
import jwt from "jsonwebtoken";

export class JwtAdapter implements Encrypter, Decoded {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret);
  }

  decode(token: string) {
    return jwt.verify(token, this.secret);
  }
}
