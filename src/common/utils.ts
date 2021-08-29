import * as bcrypt from 'bcrypt';
const SALT_OR_ROUNDS = 10;

export const hashPassword = (rawPassword: string): string => {
  const salt = bcrypt.genSaltSync(SALT_OR_ROUNDS);
  return bcrypt.hashSync(rawPassword, salt);
}

export const isPasswordMatched = (raw: string, hash: string): boolean => {
  return bcrypt.compareSync(raw, hash);
}