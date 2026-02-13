export interface IData {
  nom: string,
  email: string,
  password_hash: string,
  vault_salt?: string,
  role: string,
  is_verified: boolean,
  verify_token: string,
  reset_token: string,
  create_at: Date,
  update_at: Date
}