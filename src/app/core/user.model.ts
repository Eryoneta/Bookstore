export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenValidade: Date
  ) { }
  get token() {
    if (!this._tokenValidade || new Date() > this._tokenValidade) return null;
    return this._token;
  }
}
//TIPOS DE USUÁRIOS
export enum UserType {
  VISITOR, CLIENT, ADMIN
}