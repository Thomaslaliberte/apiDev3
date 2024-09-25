import mongoose, { Schema, model } from 'mongoose';


// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface IUser {
  _id: string;
  name: string;
  email: string;
  created: Date;
  motDePasse: string;
}


// **** Schema **** //
const UserSchema = new Schema<IUser>({
  _id: { type: String},
  name: { 
    type: String,
    required: [true, 'Le nom est obligatoire'] },
  email: {
    type: String,
    required: [true, "Le email est obligatoire"]
  },
  created: {
    type: Date,
    required: [true, 'Le created est obligatoire'],
    validate: {
      // Code inspiré de la documentation de Mongoose sur les validateurs personnalisés
      // https://mongoosejs.com/docs/validation.html#custom-validators
      validator: function (v: Date) {
        return v < new Date(Date.now());
      },
      message: (props) =>
        `${props.value} n'est pas une date valide!`,
    },
  },
  motDePasse:{
    type: String,
    required: [true, "le mot de passe est obligatoire"]
  }
});





// **** Export **** //
mongoose.pluralize(null);
export default model<IUser>('users', UserSchema);

