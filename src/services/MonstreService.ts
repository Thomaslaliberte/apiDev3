import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import MonstreRepo from '@src/repos/MonstreRepo';
import { IMonstre } from '@src/models/Monstre';


// **** Variables **** //

export const MONSTRE_NOT_FOUND_ERR = 'Monstre non trouvée';


// **** Functions **** //

/**
 * Cherche tout les monstres
 */
function getAll(): Promise<IMonstre[]> {
  return MonstreRepo.getAll();
}

/**
 * Cherche un monstre par son nom
 */
async function getOneNom(nom:string): Promise<IMonstre | null> {
  let monstre = MonstreRepo.getOneNom(nom);
  if (!(await monstre)) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      MONSTRE_NOT_FOUND_ERR,
    );
  }
  return monstre
}

/**
 * Cherche un monstre par sa puissance
 */
async function getOnePuissance(puissance:number): Promise<IMonstre[]> {
  let monstres = MonstreRepo.getOnePuissance(puissance);
  if ((await monstres).length < 1) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      MONSTRE_NOT_FOUND_ERR,
    );
  }
  return monstres
}

/**
 * Cherche un monstre par son id
 */
async function getOne(id:string): Promise<IMonstre | null> {
  const persists = await MonstreRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      MONSTRE_NOT_FOUND_ERR,
    );
  }
  return MonstreRepo.getOne(id);
}

/**
 * Ajoute un utilisateur
 */
function addOne(monstre: IMonstre): Promise<IMonstre> {
  return MonstreRepo.add(monstre);
}

/**
 * Modifie un utilisateur
 */
async function updateOne(monstre: IMonstre): Promise<IMonstre> {

  const persists = await MonstreRepo.persists(monstre._id!);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      MONSTRE_NOT_FOUND_ERR,
    );
  }
  return MonstreRepo.update(monstre);
}

/**
 * Supprime un utilisateur
 */
async function _delete(id: string): Promise<void> {
  const persists = await MonstreRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      MONSTRE_NOT_FOUND_ERR,
    );
  }
  return MonstreRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  getOneNom,
  getOnePuissance,
  addOne,
  updateOne,
  delete: _delete,
} as const;
