import { Case } from "../util/epreuve04/case";
import { Groupe } from "../util/epreuve04/groupe";
import { Sudoku } from "../util/epreuve04/sudoku";

describe("Test classe Case", () => {
  const caseLectureSeul = new Case("5");
  let c: Case;
  beforeEach(() => {
    c = new Case(".");
  });

  test("Case lecture seul ne peut que renvoyer une valeur ", () => {
    expect(caseLectureSeul.getValeur()).toEqual("5");
    expect(() => caseLectureSeul.ajouterValeurPossible("3")).toThrowError("La case est en lecture seule !");
    expect(() => caseLectureSeul.getNextValeurPossible()).toThrowError("La case est en lecture seule !");
    expect(() => caseLectureSeul.setValeur("4")).toThrowError("La case est en lecture seule !");
  });

  test("Case non défini, sa valeur n’est pas défini", () => {
    expect(c.getValeur()).toEqual(undefined);
  });

  test("Case non défini, ajouter valeur possible", () => {
    expect(c.getNombreValeurPossible()).toEqual(0);
    c.ajouterValeurPossible("1");
    c.ajouterValeurPossible("2");
    expect(c.getNombreValeurPossible()).toEqual(2);
    c.ajouterValeurPossible("2");
    expect(c.getNombreValeurPossible()).toEqual(2);
  });

  test("Case non défini, set valeur", () => {
    c.ajouterValeurPossible("1");
    c.ajouterValeurPossible("2");
    expect(c.getValeur()).toEqual(undefined);
    c.setValeur("2");
    expect(c.getValeur()).toEqual("2");
    expect(() => c.setValeur("4")).toThrowError("La valeur ne fait pas partie des possibilitées");
  });

  test("Case non défini, get next valeur", () => {
    expect(() => c.getNextValeurPossible()).toThrowError("Aucune valeur possible n’a été initialisé !");
    c.ajouterValeurPossible("1");
    c.ajouterValeurPossible("2");
    expect(c.getNextValeurPossible()).toEqual("1");
    c.setValeur("1");
    expect(c.getNextValeurPossible()).toEqual("2");
    c.setValeur("2");
    expect(c.getNextValeurPossible()).toEqual(undefined);
  });
});

describe("Groupe", () => {
  let g: Groupe;
  beforeEach(() => {
    g = new Groupe();
  });

  test("Groupe vide", () => {
    expect(g.structureValide()).toBeFalsy();
    expect(g.groupeValide()).toBeFalsy();
    expect(g.validePartiellement()).toBeTruthy();
  });

  test("Groupe de 3 case", () => {
    g.addCase(new Case("3"));
    g.addCase(new Case("4"));
    g.addCase(new Case("5"));
    expect(g.structureValide()).toBeFalsy();
    expect(g.groupeValide()).toBeFalsy();
    expect(g.validePartiellement()).toBeTruthy();
    expect(g.getValeurPossible()).toEqual(["1", "2", "6", "7", "8", "9"]);
  });
  test("Groupe de 9 case valide", () => {
    g.addCase(new Case("1"));
    g.addCase(new Case("2"));
    g.addCase(new Case("3"));
    g.addCase(new Case("4"));
    g.addCase(new Case("5"));
    g.addCase(new Case("6"));
    g.addCase(new Case("7"));
    g.addCase(new Case("8"));
    g.addCase(new Case("9"));
    expect(g.structureValide()).toBeTruthy();
    expect(g.groupeValide()).toBeTruthy();
    expect(g.validePartiellement()).toBeTruthy();
    expect(g.getValeurPossible()).toEqual([]);
  });

  test("Groupe de case non possible, deux case identique ajouté", () => {
    g.addCase(new Case("1"));
    g.addCase(new Case("."));
    g.addCase(new Case("3"));
    g.addCase(new Case("4"));
    g.addCase(new Case("5"));
    g.addCase(new Case("6"));
    g.addCase(new Case("7"));
    expect(() => g.addCase(new Case("3"))).toThrowError("La valeur 3 n’est pas disponible dans le groupe.");
  });

  test("Groupe de 9 case non déterminer", () => {
    g.addCase(new Case("1"));
    g.addCase(new Case("2"));
    g.addCase(new Case("."));
    g.addCase(new Case("."));
    g.addCase(new Case("5"));
    g.addCase(new Case("6"));
    g.addCase(new Case("7"));
    g.addCase(new Case("8"));
    g.addCase(new Case("9"));
    expect(g.structureValide()).toBeTruthy();
    expect(g.groupeValide()).toBeFalsy();
    expect(g.validePartiellement()).toBeTruthy();
    expect(g.getValeurPossible()).toEqual(["3", "4"]);
  });
});

describe("Sudoku", () => {
  const sudokuExercice = {
    grille: "1957842..\n3.6529147\n4721.3985\n637852419\n8596.1732\n214397658\n92.418576\n5.8976321\n7612358.4",
    solution: "195784263\n386529147\n472163985\n637852419\n859641732\n214397658\n923418576\n548976321\n761235894",
  };

  const sudokuMoyen = {
    grille: "1...8.7.6\n8.2.61.5.\n.......1.\n..6192.87\n.29...43.\n71.5432..\n.7.......\n.5.42.6.3\n6.4.5...2\n",
    solution: "135984726\n892761354\n467235918\n346192587\n529876431\n718543269\n273619845\n951428673\n684357192\n\n\n",
  };

  const sudokuDiabolique = {
    grille: ".3..2.78..\n6.9..3..7\n.27.94.6.\n.6........\n1..7...4..\n37..82...\n49.1753.2\n2.8....75\n.53248..6",
    solution: "",
  };

  test("Résoudre Sudoku facile", () => {
    // l’alimentation des valeurs possible des cases et faite en incrémental alors que cela devrait être des intersection de valeurs de groupe
    let s = new Sudoku(sudokuExercice.grille);
    let resultat = s.resoudre();
    expect(resultat.resolu).toBeTruthy();
    expect(resultat.solution).toEqual(sudokuExercice.solution);
  });
});
