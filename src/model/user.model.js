import mongoose from "mongoose";
import generateHash from "../utils/hashProvider.js";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
      minlength: [3, "Nome deve ter no mínimo 3 caracteres"],
      maxlength: [100, "Nome não pode exceder 100 caracteres"],
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório"],
      unique: [true, "Email já existe"],
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Insira um email válido"],
    },
    password: {
      type: String,
      required: [true, "Senha é obrigatória"],
      minlength: [3, "Senha deve ter no mínimo 3 caracteres"],
      select: false, // NÃO RETORNA A SENHA
    },
    age: {
      type: Number,
      required: [true, "Idade é obrigatória"],
      min: [18, "Você deve ter no mínimo 18 anos"],
      max: [120, "Idade incompatível, acima de 120 anos"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (document, obj) => {
        delete obj.password;
        return obj;
      },
    },
  },
);

// HOOKS PARA HASHEAR PASSWORD
UserSchema.pre("save", async function () {
  this.password = await generateHash(this.password);
});

UserSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();
  if (update.password) {
    update.password = await generateHash(update.password);
  }
});

export default mongoose.model("User", UserSchema);