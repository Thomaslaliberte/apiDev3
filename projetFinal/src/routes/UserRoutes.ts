import HttpStatusCodes from '@src/common/HttpStatusCodes';
import UserService from '@src/services/UserService';
import {IUser} from '@src/models/User';

import { IReq, IRes } from './common/types';
import check from './common/check';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  return res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Add one user.
 */
async function add(req: IReq, res: IRes) {
  console.log(2)
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
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;