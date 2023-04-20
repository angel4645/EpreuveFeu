import { Sudoku } from "./util/epreuve04/sudoku";

console.log("start facile");
const sudokuExercice = {
  grille: "1957842..\n3.6529147\n4721.3985\n637852419\n8596.1732\n214397658\n92.418576\n5.8976321\n7612358.4",
  solution: "195784263\n386529147\n472163985\n637852419\n859641732\n214397658\n923418576\n548976321\n761235894",
};
let s = new Sudoku(sudokuExercice.grille);
let resultat = s.resoudre();
console.log(resultat.solution);
console.log("start moyen");

const sudokuMoyen = {
  grille: "1...8.7.6\n8.2.61.5.\n.......1.\n..6192.87\n.29...43.\n71.5432..\n.7.......\n.5.42.6.3\n6.4.5...2\n",
  solution: "135984726\n892761354\n467235918\n346192587\n529876431\n718543269\n273619845\n951428673\n684357192\n\n\n",
};
s = new Sudoku(sudokuMoyen.grille);
resultat = s.resoudre();
console.log(resultat.solution);
