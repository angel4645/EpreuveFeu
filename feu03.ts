import { exit } from "process";
import { Matrice } from "./util/epreuve03/matrice";
import { LectureFichier } from "./util/utils";

if (process.argv.length < 4) {
  console.log("Le programme nécessite les fichiers de la matrice et de la sous-matrice en entrée !");
  exit(0);
}

const fichierMatrice = process.argv[2];
const fichierSousMatrice = process.argv[3];

try {
  const board = await LectureFichier(fichierMatrice);
  const toFind = await LectureFichier(fichierSousMatrice);
  execute(board, toFind);
} catch (err) {
  console.log(err.message);
}

function execute(board: string, toFind: string) {
  const matriceBoard = new Matrice(board);
  const matriceToFind = new Matrice(toFind);
  const resultat = matriceBoard.isIncluse(matriceToFind);
  if (resultat.find) {
    console.log("Trouvé !");
    console.log(`Coordonnées: ${resultat.indexDepart[0]},${resultat.indexDepart[1]}`);
    console.log(resultat.match);
  } else {
    console.log("Introuvable");
  }
}
