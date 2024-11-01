import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserRepo from '@src/repos/UserRepo';
import { IUser } from '@src/models/User';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'Utilisateur non trouvee';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IUser[]> {
  return UserRepo.getAll();
}
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
 * Add one user.
 */
function addOne(user: IUser): Promise<IUser> {
  return UserRepo.add(user);
}

/**
 * Update one user.
 */
async function updateOne(user: IUser): Promise<IUser> {
  const persists = await UserRepo.persists(user._id!);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Return user
  return UserRepo.update(user);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: string): Promise<void> {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
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
