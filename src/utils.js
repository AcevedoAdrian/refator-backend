import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPssword = (user, password) => bcrypt.compareSync(password, user.password);

// GENRA EL TOKEN CON JWT
export const generateToken = user => {
  const { _id, last_name, first_name, email, role } = user;
  const SECRET = process.env.JWT_PRIVATE_KEY;
  // jwt.sing('objeto informacion', 'clave para hacer cifrado', 'tiempo de vida')
  // const token = jwt.sign({ user }, SECRET, { expiresIn: '24h' }); funcionando
  const token = jwt.sign({ _id, last_name, first_name, email, role }, SECRET, { expiresIn: '24h' });
  return token;
};
// ECTRAE EL TOKEN DE UNA COOKIE
export const cookieExtractor = req => {
  const COOKIENAME = process.env.JWT_NAME_COOKIE;
  const token =
    req && req.signedCookies[COOKIENAME] ? req.signedCookies[COOKIENAME] : null;
  return token;
};

export default __dirname;
