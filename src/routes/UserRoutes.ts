import HttpStatusCodes from '@src/common/HttpStatusCodes';
import UserService from '@src/services/UserService';
import {IUser} from '@src/models/User';

import { IReq, IRes } from './common/types';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  return res.status(HttpStatusCodes.OK).json({ users });
}

async function getOne(req: IReq, res: IRes) {
  const user = await UserService.getOne(req.params.id as string);
  return res.status(HttpStatusCodes.OK).json({ user });
}

async function getOneCourriel(req: IReq, res: IRes) {
  const user = await UserService.getOneCourriel(req.params.courriel as string);
  return res.status(HttpStatusCodes.OK).json({ user });
}
/**
 * Add one user.
 */
async function add(req: IReq, res: IRes) {
  let { user } = req.body;
  user = await UserService.addOne(user as IUser);
  return res.status(HttpStatusCodes.CREATED).json({ user });
}

/**
 * Update one user.
 */
async function update(req: IReq, res: IRes) {
  let { user } = req.body;
  user = await UserService.updateOne(user as IUser);
  return res.status(HttpStatusCodes.OK).json({ user });
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = req.params.id;
  await UserService.delete(id as string);
  return res.status(HttpStatusCodes.OK).json({"message":"utilisateur supprime"});
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  getOneCourriel,
  add,
  update,
  delete: delete_,
} as const;