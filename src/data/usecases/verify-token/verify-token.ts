import {
  DecodeModel,
  VerifyDecodedToken,
} from "../../../domain/usecases/verify-decoded-token";
import { Decoded } from "../../protocols/cryptography/decoded";

export class VerifyToken implements VerifyDecodedToken {
  constructor(private readonly decoded: Decoded) {}

  verify(token: string): DecodeModel {
    try {
      const decodedToken = this.decoded.decode(token);

      return { valid: true, payload: decodedToken };
    } catch (err) {
      return { valid: false, error: err.message };
    }
  }
}
