import { Labyrinthe } from "../util/epreuve06/labyrinthe";

describe("Solution labyrinthe", () => {
  test("Solution labyrinthe ligne droite", () => {
    const lab = new Labyrinthe(["***", "1 2", "***"], "1", "2", " ", "*", "o");
    const resultat = lab.executer();
    expect(resultat.nombreCaseChemin).toEqual(1);
    expect(resultat.solution).toEqual("***\n1o2\n***");
  });

  test("Solution labyrinthe simple", () => {
    const lab = new Labyrinthe(["***2*", "*   *", "*   *", "1   *", "*****"], "1", "2", " ", "*", "o");
    const resultat = lab.executer();
    expect(resultat.nombreCaseChemin).toEqual(5);
  });

  test("Solution labyrinthe Complexe", () => {
    const lab = new Labyrinthe(
      [
        "*****2****",
        "* *   ****",
        "*   **** *",
        "* ****   *",
        "*  *     2",
        "*  ** *  *",
        "*  *    **",
        "***  **  *",
        "1     ****",
        "**********",
      ],
      "1",
      "2",
      " ",
      "*",
      "o"
    );
    const resultat = lab.executer();
    expect(resultat.nombreCaseChemin).toEqual(12);
  });
});
