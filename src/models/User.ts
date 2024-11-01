import mongoose, { Schema, model } from 'mongoose';


// **** Types **** //

export interface IUser {
  _id?: string;
  nom: string;
  courriel: string;
  cree: Date;
  motDePasse: string;
}

// **** Schema **** //
const UserSchema = new Schema<IUser>({
  nom: { 
    type: String,
    required: [true, 'Le nom est obligatoire'] },
  courriel: {
    type: String,
    required: [true, "Le courriel est obligatoire"]
  },
  cree: {
    type: Date,
    required: [true, 'Le cree est obligatoire'],
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
