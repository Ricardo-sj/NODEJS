import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Título é obrigatório"],
      trim: true,
      minlength: [1, "Título deve ter no mínimo 1 caractere"],
      maxlength: [200, "Título não pode exceder 200 caracteres"],
    },
    _titleNormalized: {
      type: String,
      unique: true,
      select: false,
    },
    description: {
      type: String,
      minlength: [10, "Descrição deve ter no mínimo 10 caracteres"],
      maxlength: [2000, "Descrição não pode exceder 2000 caracteres"],
      default: "Título sem descrição",
    },
    year: {
      type: Number,
      min: [1900, "Ano deve ser maior ou igual a 1900"],
      max: [new Date().getFullYear(), "Ano não pode ser no futuro"],
      default: "Ano não informado",
    },
    genre: {
      type: String,
      trim: true,
      minlength: [3, "Gênero deve ter no mínimo 3 caracteres"],
      default: "Gênero não informado",
    },
    image: {
      type: String,
      default: ".img",
    },
    video: {
      type: String,
      default: ".mp4",
    },
  },
  { timestamps: true },
);

MovieSchema.pre("save", function () {
  if (this.isModified("title")) {
    this._titleNormalized = this.title.toLowerCase().replace(/\s+/g, "");
  }
});

MovieSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();
  if (update?.title) {
    update._titleNormalized = update.title.toLowerCase().replace(/\s+/g, "");
  }
});

export default mongoose.model("Movie", MovieSchema);