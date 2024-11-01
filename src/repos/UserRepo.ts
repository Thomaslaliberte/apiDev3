import User, { IUser } from '@src/models/User';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';


// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(id: string): Promise<IUser | null> {
  return await User.findById(id);
  

}

async function getOneCourriel(courriel: string): Promise<IUser | null> {
  return  await User.findOne({courriel: courriel });
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: string): Promise<boolean> {
  const user = await User.findById(id);
  if (user != null){
    return true;
  }
  return false;
}

/**
 * Get all users.
 */
async function getAll(): Promise<IUser[]> {
  const user = User.find();
  return user;
}

/**
 * Add one user.
 */
async function add(user: IUser): Promise<IUser> {
  const nouvelUser = new User(user);
  await nouvelUser.save();
  return nouvelUser;
}

/**
 * Update a user.
 */
async function update(user: IUser): Promise<IUser> {
  const userToUpdate = await User.findById(user._id);
  if (userToUpdate === null) {
    throw new Error('Utilisateur non trouvee');
  }

  userToUpdate.nom = user.nom;
  userToUpdate.courriel = user.courriel;
  userToUpdate.cree = user.cree;
  userToUpdate.motDePasse = user.motDePasse;
  await userToUpdate.save();

  return userToUpdate;
}

/**
 * Delete one user.
 */
async function delete_(id: string): Promise<void> {
  await User.findByIdAndDelete(id);
}


// **** Export default **** //

export default {
  getOne,
  getOneCourriel,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;