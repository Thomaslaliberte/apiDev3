import User, { IUser } from '@src/models/User';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';


// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(id: string): Promise<IUser | null> {
  const user = await User.findById(id);
  if (user === null) {
    throw new Error('Personne non trouvé');
  }
  return user;
}

async function getOneEmail(email: string): Promise<IUser | null> {
  const user = await User.find({email: email });
    if (user === null) {
      throw new Error('user non trouvé');
    }
    return user as unknown as IUser;
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: string): Promise<boolean> {
  const user = await User.findById(id);
  console.log(user)
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
  console.log(3)
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
    throw new Error('Personne non trouvé');
  }

  userToUpdate.name = user.name;
  userToUpdate.email = user.email;
  userToUpdate.created = user.created;
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
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
