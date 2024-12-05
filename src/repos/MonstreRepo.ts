import Monstre, { IMonstre } from "@src/models/Monstre";
import moment from "moment";

// **** Functions **** //

/**
 * cherche un monstre par son id
 */
async function getOne(id: string): Promise<IMonstre | null> {
  return await Monstre.findById(id);
}

/**
 * cherche un monstre par son nom
 */
async function getOneNom(nom: string): Promise<IMonstre | null> {
  return await Monstre.findOne({ nom: nom });
}

/**
 * cherche un monstre par puissance
 */
async function getOnePuissance(puissance: number): Promise<IMonstre[]> {
  return await Monstre.find({ puissance: puissance });
}

/**
 * regarde si un monstre existe
 */
async function persists(id: string): Promise<boolean> {
  const monstre = await Monstre.findById(id);
  return monstre !== null;
}

/**
 * cherche tout les monstres
 */
async function getAll(): Promise<IMonstre[]> {
  const monstre = Monstre.find();
  return monstre;
}

/**
 * ajoute un monstre
 */
async function add(monstre: IMonstre): Promise<IMonstre> {
  const nouveauMonstre = new Monstre(monstre);
  await nouveauMonstre.save();
  return nouveauMonstre;
}

/**
 * cherche un utilisateur
 */
async function update(monstre: IMonstre): Promise<IMonstre> {
  const monstreToUpdate = await Monstre.findById(monstre._id);
  if (monstreToUpdate === null) {
    throw new Error("Monstre non trouvée");
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

/**
 * supprimer un monstre
 */
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
