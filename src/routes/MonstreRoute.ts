import HttpStatusCodes from '@src/common/HttpStatusCodes';
import MonstreService from '@src/services/MonstreService';
import {IMonstre} from '@src/models/Monstre';

import { IReq, IRes } from './common/types';
import check from './common/check';


// **** Functions **** //

async function getAll(_: IReq, res: IRes) {
  const monstres = await MonstreService.getAll();
  return res.status(HttpStatusCodes.OK).json({ monstres });
}

async function getOne(req: IReq, res: IRes) {
  const monstre = await MonstreService.getOne(req.params.id as string);
  return res.status(HttpStatusCodes.OK).json({ monstre });
}

async function getOneNom(req: IReq, res: IRes) {
  const monstre = await MonstreService.getOneNom(req.params.nom as string);
  return res.status(HttpStatusCodes.OK).json({ monstre });
}

async function getOnePuissance(req: IReq, res: IRes) {
  const monstre = await MonstreService.getOnePuissance(req.params.puissance as number);
  return res.status(HttpStatusCodes.OK).json({ monstre });
}
async function add(req: IReq, res: IRes) {
  let { monstre } = req.body;
  monstre = await MonstreService.addOne(monstre as IMonstre);
  return res.status(HttpStatusCodes.CREATED).json({ monstre });
}


async function update(req: IReq, res: IRes) {
  let { monstre } = req.body;
  monstre = await MonstreService.updateOne(monstre as IMonstre);
  return res.status(HttpStatusCodes.OK).json({ monstre });
}


async function delete_(req: IReq, res: IRes) {
  const id = req.params.id;
  await MonstreService.delete(id as string);
  return res.status(HttpStatusCodes.OK).json({"message": "le monstre a été supprimé"});
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  getOneNom,
  getOnePuissance,
  add,
  update,
  delete: delete_,
} as const;