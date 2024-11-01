import JetonService from '@src/services/JetonService';
import User from '@src/models/User';
import UserLogin from '@src/models/UserLogin';
import { IReq, IRes } from './common/types';
import check from './common/check';
// **** Functions **** //

/**
 * Générer un jeton.
 *
 * @param {IReq} req - La requête au serveur
 * @param {IRes} res - La réponse du serveur
 */
async function generateToken(req: IReq, res: IRes) {
  const userLogin = check.isValid(req.body, 'userlogin', UserLogin.isUserLogin);
  const token = await JetonService.generateToken(userLogin);
  return res.send({ token: token });
}

// **** Export default **** //

export default {
  generateToken,
} as const;