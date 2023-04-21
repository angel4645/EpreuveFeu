import { PlusGrandCarre } from "../util/epreuve05/plusGrandCarre";

describe("Test plus grand carre", () => {
  let input: {
    input: string[];
    nbLigne: number;
    vide: string;
    plein: string;
    obstacle: string;
  };
  let carre: PlusGrandCarre;
  beforeEach(() => {
    input = {
      nbLigne: 4,
      vide: ".",
      plein: "o",
      obstacle: "x",
      input: [".....x....", ".x......x.", ".x....x..x", ".........."],
    };
  });

  test("input valide", () => {
    carre = new PlusGrandCarre(input.input, input.nbLigne, input.vide, input.obstacle, input.plein);
    const validation = carre.isValide();
    expect(validation.valide).toBeTruthy();
  });

  test("input invalide: grille vide", () => {
    input.input = [];
    carre = new PlusGrandCarre(input.input, input.nbLigne, input.vide, input.obstacle, input.plein);
    const validation = carre.isValide();
    expect(validation.valide).toBeFalsy();
    expect(validation.erreur).toEqual("La grille est vide");
  });

  test("input invalide: longeur de ligne non valide", () => {
    input.input = ["...", "......", "...", "..."];
    carre = new PlusGrandCarre(input.input, input.nbLigne, input.vide, input.obstacle, input.plein);
    const validation = carre.isValide();
    expect(validation.valide).toBeFalsy();
    expect(validation.erreur).toEqual("La longeur des lignes non valide");
  });

  test("input invalide: longeur de ligne à 0", () => {
    input.input = ["...", "...", "", "..."];
    carre = new PlusGrandCarre(input.input, input.nbLigne, input.vide, input.obstacle, input.plein);
    const validation = carre.isValide();
    expect(validation.valide).toBeFalsy();
    expect(validation.erreur).toEqual("La longeur des lignes non valide");
  });

  test("input invalide: caractère non valide", () => {
    input.input = ["...", "..a", "...", "..."];
    carre = new PlusGrandCarre(input.input, input.nbLigne, input.vide, input.obstacle, input.plein);
    const validation = carre.isValide();
    expect(validation.valide).toBeFalsy();
    expect(validation.erreur).toEqual("Caractère non valide: a");
  });

  test("Recherche solution avec input non valide", () => {
    input.input = ["...", "..a", "...", "..."];
    carre = new PlusGrandCarre(input.input, input.nbLigne, input.vide, input.obstacle, input.plein);
    expect(() => carre.executer()).toThrowError("Caractère non valide: a");
  });

  test("Recherche solution valide grille ne contient que desobstacle", () => {
    input.input = ["xx", "xx"];
    carre = new PlusGrandCarre(input.input, input.nbLigne, input.vide, input.obstacle, input.plein);
    const resultat = carre.executer();
    expect(resultat.taille).toEqual(0);
    expect(resultat.position).toEqual([-1, -1]);
    expect(carre.getGrilleSortie()).toEqual("xx\nxx");
  });
  test("Recherche solution valide grille avec 1 vide", () => {
    input.input = ["x.", "xx"];
    carre = new PlusGrandCarre(input.input, input.nbLigne, input.vide, input.obstacle, input.plein);
    const resultat = carre.executer();
    expect(resultat.taille).toEqual(1);
    expect(resultat.position).toEqual([1, 0]);
    expect(carre.getGrilleSortie()).toEqual("xo\nxx");
  });

  test("Recherche solution valide grille total 1 case vide", () => {
    input.input = ["."];
    carre = new PlusGrandCarre(input.input, input.nbLigne, input.vide, input.obstacle, input.plein);
    const resultat = carre.executer();
    expect(resultat.taille).toEqual(1);
    expect(resultat.position).toEqual([0, 0]);
    expect(carre.getGrilleSortie()).toEqual("o");
  });

  test("Recherche solution valide grille total 1 obstacle", () => {
    input.input = ["x"];
    carre = new PlusGrandCarre(input.input, input.nbLigne, input.vide, input.obstacle, input.plein);
    const resultat = carre.executer();
    expect(resultat.taille).toEqual(0);
    expect(resultat.position).toEqual([-1, -1]);
    expect(carre.getGrilleSortie()).toEqual("x");
  });

  test("Recherche solution valide", () => {
    carre = new PlusGrandCarre(input.input, input.nbLigne, input.vide, input.obstacle, input.plein);
    const resultat = carre.executer();
    expect(resultat.taille).toEqual(3);
    expect(resultat.position).toEqual([2, 0]);
    expect(carre.getGrilleSortie()).toEqual("..ooox....\n.xooo...x.\n.xooo.x..x\n..........");
  });
  test("Recherche solution valide", () => {
    input.input = [
      "...........................",
      "....x......................",
      "............x..............",
      "...........................",
      "....x......................",
      "...............x...........",
      "...........................",
      "......x..............x.....",
      "..x.......x................",
    ];
    input.nbLigne = 9;
    carre = new PlusGrandCarre(input.input, input.nbLigne, input.vide, input.obstacle, input.plein);
    const resultat = carre.executer();
    expect(resultat.taille).toEqual(7);
    expect(resultat.position).toEqual([5, 0]);
    const resGrille =
      ".....ooooooo...............\n....xooooooo...............\n.....ooooooox..............\n.....ooooooo...............\n....xooooooo...............\n.....ooooooo...x...........\n.....ooooooo...............\n......x..............x.....\n..x.......x................";
    expect(carre.getGrilleSortie()).toEqual(resGrille);
  });

  test("Recherche solution valide grand carré vide", () => {
    const grille: string[] = [];
    const grilleOutput: string[] = [];
    for (let i = 0; i < 100; i++) {
      grille.push(".".repeat(100));
      grilleOutput.push("o".repeat(100));
    }
    input.input = grille;
    carre = new PlusGrandCarre(input.input, input.nbLigne, input.vide, input.obstacle, input.plein);
    const resultat = carre.executer();
    expect(resultat.taille).toEqual(100);
    expect(resultat.position).toEqual([0, 0]);
    expect(carre.getGrilleSortie()).toEqual(grilleOutput.join("\n"));
  });
});
