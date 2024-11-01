import mongoose, { Schema, model } from 'mongoose';


// **** Types **** //

export interface IMonstre {
  _id?: string;
  nom: string;
  CA: number;
  armureNaturel: boolean;
  vie: number;
  vitesse: number;
  ajout: Date;
  stats: number[];
  puissance: number;
}

// **** Schema **** //
const MonstreSchema = new Schema<IMonstre>({
  nom: { 
    type: String,
    required: [true, 'Le nom est obligatoire'] },
  CA: {
    type: Number,
    required: [true, "La classe d'armure est obligatoire"],
    validate:{
      validator:function(v:number){
          return v>0
      },
      message: (props) =>
        `${props.value} la classe d\'armure a un minimum de 0!`,
  }
  },
  armureNaturel: {
    type: Boolean,
    required: [true, 'L\'armure naturel est obligatoire'],
  },
  vie:{
    type: Number,
    required: [true, "la vie est obligatoire"],
    validate:{
      validator:function(v:number){
          return v>0
      },
      message: (props) =>
        `${props.value} la vie a un minimum de 0!`,
  }
  },
  vitesse:{
    type: Number,
    required: [true,"la vitesse est obligatoire"],
    validate:{
      validator:function(v:number){
          return v > 0
      },
      message: (props) =>
        `${props.value} la vitesse a un minimum de 0!`,
  }
  },
  ajout:{
    type:Date,
    required:[true,"la date d\'ajout est obligatoire"],
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
  stats:{
    type:[Number],
    required:[true,"les stats ne sont pas valide"],
    validate:{
        validator:function(v:Number[]){
            return v.length == 6
        },
        message: (props) =>
          `${props.value} il doit y avoir 6 stats!`,
    }
  },
  puissance:{
    type:Number,
    required:[true,"la puissance est obligatoire"],
    validate:{
      validator:function(v:number){
          return v >= 0
      },
      message: (props) =>
        `${props.value} la puissance a un minimum de 0!`,
  }
  }
});


// **** Export **** //
mongoose.pluralize(null);

export default model<IMonstre>('monstres', MonstreSchema);
