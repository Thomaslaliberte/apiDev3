import HttpStatusCodes from '@src/common/HttpStatusCodes';
import UserService from '@src/services/UserService';
import {IUser} from '@src/models/User';

import { IReq, IRes } from './common/types';


// **** Functions **** //


/**
 * Cherche pour tout les utilisateur
 *
 * @param {IReq} req - La requête au serveur
 * @param {IRes} res - La réponse du serveur
 */
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  return res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Cherche un monstre par son id
 *
 * @param {IReq} req - La requête au serveur
 * @param {IRes} res - La réponse du serveur
 */
async function getOne(req: IReq, res: IRes) {
  const user = await UserService.getOne(req.params.id as string);
  return res.status(HttpStatusCodes.OK).json({ user });
}

/**
 * Cherche un utilisateur par son courriel
 *
 * @param {IReq} req - La requête au serveur
 * @param {IRes} res - La réponse du serveur
 */
async function getOneCourriel(req: IReq, res: IRes) {
  const user = await UserService.getOneCourriel(req.params.courriel as string);
  return res.status(HttpStatusCodes.OK).json({ user });
}

/**
 * Ajoute un utilisateur
 *
 * @param {IReq} req - La requête au serveur
 * @param {IRes} res - La réponse du serveur
 */
async function add(req: IReq, res: IRes) {
  let { user } = req.body;
  user = await UserService.addOne(user as IUser);
  return res.status(HttpStatusCodes.CREATED).json({ user });
}

/**
 * Modifie un utilisateur
 *
 * @param {IReq} req - La requête au serveur
 * @param {IRes} res - La réponse du serveur
 */
async function update(req: IReq, res: IRes) {
  let { user } = req.body;
  user = await UserService.updateOne(user as IUser);
  return res.status(HttpStatusCodes.OK).json({ user });
}

/**
 * Supprimer un utilisateur
 *
 * @param {IReq} req - La requête au serveur
 * @param {IRes} res - La réponse du serveur
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