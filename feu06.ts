import { exit } from "process";
import { Labyrinthe } from "./util/epreuve06/labyrinthe";
import { LectureFichier } from "./util/utils";

if (process.argv.length < 3) {
  console.log("Le programme nécessite un fichier en entrée !");
  exit(0);
}

const fichierBoard = process.argv[2];

try {
  const boardInput = await LectureFichier(fichierBoard);

  const parametre = traitementFichierLabyrinthe(boardInput);
  const lab = new Labyrinthe(
    parametre.board,
    parametre.caractereEntree,
    parametre.caractereSortie,
    parametre.caractereVide,
    parametre.caracterePlein,
    parametre.caractereChemin
  );
  const resulat = lab.executer();
  console.log(resulat.solution);
  console.log(`=> SORTIE ATTEINTE EN ${resulat.nombreCaseChemin} COUPS !`);
} catch (err) {
  console.log(`Erreur: ${err.message}`);
}

function traitementFichierLabyrinthe(input: string) {
  const splitInput = input.split("\n");
  if (splitInput.length < 2) {
    throw new Error("Le fichier ne semble pas valide, nombre de ligne inférieur à 2");
  }
  const parametre = splitInput[0].trim();
  if (parametre.length < 8) {
    throw new Error(
      "La ligne de paramètre doit contenir le nombre de ligne x nombre de colonnes, le caractères plein, vide, chemin, entrée et sortie"
    );
  }
  const stringNbLigneXnbCol = parametre.slice(0, parametre.length - 5);
  const indexX = stringNbLigneXnbCol.indexOf("x");
  if (indexX === -1) {
    throw new Error("Séparateur x de taille du labyrinthe non trouvé");
  }
  const stringNbLigne = stringNbLigneXnbCol.slice(0, indexX);
  const stringNbCol = stringNbLigneXnbCol.slice(indexX + 1);
  const nbligne = parseInt(stringNbLigne);
  if (isNaN(nbligne)) {
    throw new Error("Erreur de la conversion du nombre de ligne: " + stringNbLigne);
  }
  const nbCol = parseInt(stringNbCol);
  if (isNaN(nbligne)) {
    throw new Error("Erreur de la conversion du nombre de ligne: " + stringNbCol);
  }
  const caractere = parametre.slice(parametre.length - 5);

  let board: string[] = splitInput.slice(1);
  board = board.map((x) => x.trim());
  while (board[board.length - 1] === "") {
    board = board.slice(0, board.length - 1);
  }
  if (board.length !== nbligne) {
    throw new Error("Le nombre de ligne du labyrinthe ne correspond pas à celle du paramétrage");
  }
  board.forEach((ligne) => {
    if (ligne.length !== nbCol) {
      throw new Error("Le nombre de colonne du labyrinthe ne correspond pas à celle du paramétrage");
    }
  });

  return {
    nbligne: nbligne,
    caracterePlein: caractere[0],
    caractereVide: caractere[1],
    caractereChemin: caractere[2],
    caractereEntree: caractere[3],
    caractereSortie: caractere[4],
    board: board,
  };
}
