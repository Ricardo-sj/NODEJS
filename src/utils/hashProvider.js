import { compare, hash } from "bcryptjs";

export default function generateHash(password) {
    return hash(password, 8);
};