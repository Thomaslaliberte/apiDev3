import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
// **** Variables **** //

import { IUserLogin } from '@src/models/UserLogin';
import UserService from './UserService';
import jwt from 'jsonwebtoken';

export const UTILISATEUR_NOT_FOUND_ERR = 'Utilisateur non trouvé';

// **** Functions **** //

/**
 * Générer un jeton pour un utilisateur
 *
 * @param {IUserLogin} utilisateur - L'utilisateur demandant le jeton
 * @returns {Promise} - Le jeton signé
 */
async function generateToken(utilisateur: IUserLogin): Promise<string> {
  const utilisateurBD = (await UserService.getAll()).filter(
    (user) => user.courriel === utilisateur.courriel
  )[0];
  if (utilisateurBD && utilisateurBD.motDePasse === utilisateur.motDePasse) {
    return jwt.sign(utilisateur.courriel, process.env.JWT_SECRET as string);
  } else {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      UTILISATEUR_NOT_FOUND_ERR,
    );
  }
}

// **** Export default **** //
export default {
  generateToken,
} as const;