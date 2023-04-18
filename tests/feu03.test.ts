import { Matrice } from "../util/epreuve03/matrice";

describe("Generation matrice", () => {
  let matrice: Matrice;
  test("Generer matrice classique avec retour chariot en fin de fichier", () => {
    const input = "123\n456\n789\n";
    matrice = new Matrice(input);
    const output = matrice.getMatrice();
    expect(output.length).toEqual(3);
    expect(output[0].length).toEqual(3);
    expect(output[0].join("")).toEqual("123");
    expect(output[1].length).toEqual(3);
    expect(output[1].join("")).toEqual("456");
    expect(output[2].length).toEqual(3);
    expect(output[2].join("")).toEqual("789");
  });

  test("Generer matrice classique sans retour chariot en fin de fichier", () => {
    const input = "123\n456\n789";
    matrice = new Matrice(input);
    const output = matrice.getMatrice();
    expect(output.length).toEqual(3);
    expect(output[0].length).toEqual(3);
    expect(output[0].join("")).toEqual("123");
    expect(output[1].length).toEqual(3);
    expect(output[1].join("")).toEqual("456");
    expect(output[2].length).toEqual(3);
    expect(output[2].join("")).toEqual("789");
  });

  test("Generer matrice classique avec multiple retour chariot en fin de fichier", () => {
    const input = "123\n456\n789\n\n\n";
    matrice = new Matrice(input);
    const output = matrice.getMatrice();
    expect(output.length).toEqual(3);
    expect(output[0].length).toEqual(3);
    expect(output[0].join("")).toEqual("123");
    expect(output[1].length).toEqual(3);
    expect(output[1].join("")).toEqual("456");
    expect(output[2].length).toEqual(3);
    expect(output[2].join("")).toEqual("789");
  });

  test("Generer matrice classique avec  espace", () => {
    const input = "  3\n4  6\n7  \n   \n";
    matrice = new Matrice(input);
    const output = matrice.getMatrice();
    expect(output.length).toEqual(4);
    expect(output[0].length).toEqual(3);
    expect(output[0].join("")).toEqual("  3");
    expect(output[1].length).toEqual(4);
    expect(output[1].join("")).toEqual("4  6");
    expect(output[2].length).toEqual(3);
    expect(output[2].join("")).toEqual("7  ");
    expect(output[3].length).toEqual(3);
    expect(output[3].join("")).toEqual("   ");
  });
});

describe("Recherche sous matrice", () => {
  let matricePrincipal: Matrice;
  let matricePrincipal2: Matrice;
  let sousMatrice: Matrice;

  beforeAll(() => {
    const input = "0000\n1111\n2331\n";
    matricePrincipal = new Matrice(input);
    const input2 = "0000\n1111\n2331\n";
    matricePrincipal2 = new Matrice(input2);
  });

  test("trouver sous matrice simple", () => {
    const input = "11\n 1";
    sousMatrice = new Matrice(input);
    const resultat = matricePrincipal.isIncluse(sousMatrice);
    expect(resultat).toEqual({ find: true, indexDepart: [2, 1], match: "----\n--11\n---1" });
  });

  test("trouver sous matrice commencant par espace", () => {
    const input = "  0\n 11\n";
    sousMatrice = new Matrice(input);
    2;
    const resultat = matricePrincipal.isIncluse(sousMatrice);
    expect(resultat).toEqual({ find: true, indexDepart: [0, 0], match: "--0-\n-11-\n----" });
  });
  test("trouver sous matrice forme fleche", () => {
    const input = " 1 \n3 1\n";
    sousMatrice = new Matrice(input);
    const resultat = matricePrincipal.isIncluse(sousMatrice);
    expect(resultat).toEqual({ find: true, indexDepart: [1, 1], match: "----\n--1-\n-3-1" });
  });

  test("Sous matrice non trouver", () => {
    const input = "00\n00";
    sousMatrice = new Matrice(input);
    const resultat = matricePrincipal.isIncluse(sousMatrice);
    expect(resultat).toEqual({ find: false });
  });
});
