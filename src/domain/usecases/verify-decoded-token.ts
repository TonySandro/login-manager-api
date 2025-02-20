export interface DecodeModel {
  valid: boolean;
  payload?: any;
  error?: any;
}

export interface VerifyDecodedToken {
  verify(token: string): DecodeModel;
}
