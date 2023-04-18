import { exit } from "process";
import { DessinerRectangle } from "./util/epreuve01/dessinerRectangle";

if (process.argv.length < 4) {
  console.log("Le programme nécessite les arguments de largeur et hauteur !");
}

const argLargeur = parseInt(process.argv[2]);
const argHauteur = parseInt(process.argv[3]);
if (isNaN(argLargeur)) {
  console.log(`L’argument de largeur ${process.argv[2]} n’est pas un nombre valide`);
  exit(0);
}

if (isNaN(argHauteur)) {
  console.log(`L’argument de hauteur ${process.argv[3]} n’est pas un nombre valide`);
  exit(0);
}
try {
  const resultat = DessinerRectangle.generer(argLargeur, argHauteur);
  resultat.forEach((ligne) => console.log(ligne));
} catch (err) {
  console.log(err.message);
}
