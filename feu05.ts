import { exit } from "process";
import { PlusGrandCarre } from "./util/epreuve05/plusGrandCarre";
import { LectureFichier } from "./util/utils";

if (process.argv.length < 3) {
  console.log("Le programme nécessite un fichier en entrée !");
  exit(0);
}

const fichierBoard = process.argv[2];

try {
  const boardInput = await LectureFichier(fichierBoard);

  const parametre = traitementFichierBoard(boardInput);
  const plusGrandCarre = new PlusGrandCarre(
    parametre.board,
    parametre.nbligne,
    parametre.caractereVide,
    parametre.caractereObstacle,
    parametre.caracterePlein
  );
  const resulat = plusGrandCarre.executer();
  console.log(plusGrandCarre.getGrilleSortie());
} catch (err) {
  console.log(`Erreur: ${err.message}`);
}

function traitementFichierBoard(input: string) {
  const splitInput = input.split("\n");
  if (splitInput.length < 2) {
    throw new Error("Le fichier ne semble pas valide, nombre de ligne inférieur à 2");
  }
  const parametre = splitInput[0].trim();
  if (parametre.length < 4) {
    throw new Error("La ligne de paramètre doit contenir le nombre de ligne, les caractères vide, obstacle et plein");
  }
  const stringNbLigne = parametre.slice(0, parametre.length - 3);
  const nbligne = parseInt(stringNbLigne);
  if (isNaN(nbligne)) {
    throw new Error("Erreur de la conversion du nombre de ligne: " + stringNbLigne);
  }
  const caractere = parametre.slice(parametre.length - 3);
  let board: string[] = splitInput.slice(1);
  board = board.map((x) => x.trim());
  while (board[board.length - 1] === "") {
    board = board.slice(0, board.length - 1);
  }
  if (board.length !== nbligne) {
    throw new Error("Le nombre de ligne du tableau ne correspond pas à celle du paramétrage");
  }

  return {
    nbligne: nbligne,
    caractereVide: caractere[0],
    caractereObstacle: caractere[1],
    caracterePlein: caractere[2],
    board: board,
  };
}
