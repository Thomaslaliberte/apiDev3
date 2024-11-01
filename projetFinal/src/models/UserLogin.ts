import mongoose, { Schema, model } from 'mongoose';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg doit etre un string ou un objet ' + 
  'avec les  cles appropriees.';


export interface IUserLogin {
    _id?: string;
    courriel: string;
    motDePasse: string;
  }
// **** Schema **** //


const UserLoginSchema = new Schema<IUserLogin>({
    courriel: {
      type: String,
      required: [true, "Le courriel est obligatoire"]
    },
    motDePasse:{
      type: String,
      required: [true, "le mot de passe est obligatoire"]
    }
  });

  function isUserLogin(arg: unknown): arg is IUserLogin {
    return (
      !!arg &&
      typeof arg === 'object' &&
      'courriel' in arg &&
      'motDePasse' in arg
    );
  }
export const userLogin = model<IUserLogin>('user', UserLoginSchema);
export default {
    isUserLogin
}