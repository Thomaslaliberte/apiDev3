import Monstre, { IMonstre } from '@src/models/Monstre';
import moment from 'moment';

// **** Functions **** //


async function getOne(id: string): Promise<IMonstre | null> {
  return await Monstre.findById(id);

}

async function getOneNom(nom: string): Promise<IMonstre | null> {
    return await Monstre.findOne({nom : nom});
  }

  async function getOnePuissance(puissance: number): Promise<IMonstre[]> {
    return await Monstre.find({puissance : puissance});;
  }

async function persists(id: string): Promise<boolean> {
  const monstre = await Monstre.findById(id);
  return monstre !== null;
}


async function getAll(): Promise<IMonstre[]> {
  const monstre = Monstre.find();
  return monstre;
}


async function add(monstre: IMonstre): Promise<IMonstre> {
  const nouveauMonstre = new Monstre(monstre);
  await nouveauMonstre.save();
  return nouveauMonstre;
}


async function update(monstre: IMonstre): Promise<IMonstre> {
  const monstreToUpdate = await Monstre.findById(monstre._id);
  if (monstreToUpdate === null) {
    throw new Error('Monstre non trouvée');
  }

  monstreToUpdate.nom = monstre.nom;
  monstreToUpdate.CA = monstre.CA;
  monstreToUpdate.armureNaturel = monstre.armureNaturel;
  monstreToUpdate.vie = monstre.vie;
  monstreToUpdate.vitesse = monstre.vitesse;
  monstreToUpdate.ajout = monstre.ajout;
  monstreToUpdate.stats = monstre.stats;
  monstreToUpdate.puissance = monstre.puissance;
  await monstreToUpdate.save();

  return monstreToUpdate;
}


async function delete_(id: string): Promise<void> {
    await Monstre.findByIdAndDelete(id);
  }
// **** Export default **** //

export default {
  getOne,
  getOneNom,
  getOnePuissance,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;

