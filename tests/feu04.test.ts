import { Sudoku } from "../util/epreuve04/sudoku";

describe("Sudoku", () => {
  const sudokuExercice = {
    grille: "1957842..\n3.6529147\n4721.3985\n637852419\n8596.1732\n214397658\n92.418576\n5.8976321\n7612358.4",
    solution: "195784263\n386529147\n472163985\n637852419\n859641732\n214397658\n923418576\n548976321\n761235894",
  };

  const sudokufacile = {
    grille: ".1...7.29\n..9...6..\n..5.69.87\n896..1..3\n2..493..6\n4..8..912\n56.13.7..\n..2...3..\n18.9...6.\n",
    solution: "618347529\n729518634\n345269187\n896721453\n251493876\n437856912\n564132798\n972685341\n183974265",
  };

  const sudokuMoyen = {
    grille: ".8..6...4\n4..1...5.\n1...7...8\n..16.4.95\n.28...43.\n69.5.37..\n9...4...7\n.7...9..1\n3...5..8.\n",
    solution: "289365174\n467198253\n153472968\n731624895\n528917436\n694583712\n915846327\n876239541\n342751689",
  };

  test("Résoudre Sudoku Exercice", () => {
    let s = new Sudoku(sudokuExercice.grille);
    let resultat = s.resoudre();
    expect(resultat.resolu).toBeTruthy();
    expect(resultat.solution).toEqual(sudokuExercice.solution);
  });

  test("Résoudre Sudoku Facile", () => {
    let s = new Sudoku(sudokufacile.grille);
    let resultat = s.resoudre();
    expect(resultat.resolu).toBeTruthy();
    expect(resultat.solution).toEqual(sudokufacile.solution);
  });

  test("Résoudre Sudoku Moyen", () => {
    let s = new Sudoku(sudokuMoyen.grille);
    let resultat = s.resoudre();
    expect(resultat.resolu).toBeTruthy();
    expect(resultat.solution).toEqual(sudokuMoyen.solution);
  });
});
