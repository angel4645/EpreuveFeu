import { exit } from "process";
import { Sudoku } from "./util/epreuve04/sudoku";
import { LectureFichier } from "./util/utils";

if (process.argv.length < 3) {
  console.log("Le programme nécessite un fichier sudoku en entrée !");
  exit(0);
}

const fichierSudoku = process.argv[2];

try {
  const sudokuInput = await LectureFichier(fichierSudoku);
  resolveSudoku(sudokuInput);
} catch (err) {
  console.log(`Erreur: ${err.message}`);
}
function resolveSudoku(input: string) {
  const s = new Sudoku(input);
  const resultat = s.resoudre();
  if (resultat.resolu) {
    console.log(resultat.solution);
  } else {
    console.log("Aucune solution trouvé");
  }
}
