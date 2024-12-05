import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserRepo from '@src/repos/UserRepo';
import { IUser } from '@src/models/User';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'Utilisateur non trouvee';


// **** Functions **** //

/**
 * Cherche tout les utilisateur
 */
function getAll(): Promise<IUser[]> {
  return UserRepo.getAll();
}

/**
 * Cherche un utilisateur par son courriel
 */
async function getOneCourriel(courriel:string): Promise<IUser | null> {
  const persists = await UserRepo.getOneCourriel(courriel);
  if (persists === null) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  return UserRepo.getOneCourriel(courriel);
}

/**
 * Cherche un utilisateur par son id
 */
async function getOne(id:string): Promise<IUser | null> {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  return UserRepo.getOne(id);
}

/**
 * Ajoute un utilisateur
 */
function addOne(user: IUser): Promise<IUser> {
  return UserRepo.add(user);
}

/**
 * Modifie un utilisateur
 */
async function updateOne(user: IUser): Promise<IUser> {
  const persists = await UserRepo.persists(user._id!);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  return UserRepo.update(user);
}

/**
 * Supprime un utilisateur
 */
async function _delete(id: string): Promise<void> {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  return UserRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  getOneCourriel,
  getOne,
  addOne,
  updateOne,
  delete: _delete,
} as const;
