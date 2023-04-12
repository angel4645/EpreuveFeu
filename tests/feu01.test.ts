import { DessinerRectangle } from "../feu01";
describe("Echauffement", () => {
  test("doit generer un rectangle de 5 par 3", () => {
    const largeur = 5;
    const hauteur = 3;
    const resultat = DessinerRectangle.generer(largeur, hauteur);
    expect(resultat.length).toEqual(hauteur);
    resultat.forEach((ligne) => {
      expect(ligne.length).toEqual(largeur);
    });
    expect(resultat[0]).toEqual("o---o");
    expect(resultat[1]).toEqual("|   |");
    expect(resultat[0]).toEqual(resultat[2]);
  });

  test("doit generer un rectangle de 4 par 5", () => {
    const largeur = 4;
    const hauteur = 5;
    const resultat = DessinerRectangle.generer(largeur, hauteur);
    expect(resultat.length).toEqual(hauteur);
    resultat.forEach((ligne) => {
      expect(ligne.length).toEqual(largeur);
    });
    expect(resultat[0]).toEqual("o--o");
    for (let i = 1; i < resultat.length - 2; i++) {
      expect(resultat[i]).toEqual("|  |");
    }

    expect(resultat[0]).toEqual(resultat[resultat.length - 1]);
  });

  test("doit generer un rectangle de 5 par 1", () => {
    const largeur = 5;
    const hauteur = 1;
    const resultat = DessinerRectangle.generer(largeur, hauteur);
    expect(resultat.length).toEqual(hauteur);
    resultat.forEach((ligne) => {
      expect(ligne.length).toEqual(largeur);
    });
    expect(resultat[0]).toEqual("o---o");
    for (let i = 1; i < resultat.length - 2; i++) {
      expect(resultat[i]).toEqual("|   |");
    }

    expect(resultat[0]).toEqual(resultat[resultat.length - 1]);
  });

  test("doit generer un rectangle de 1 par 5", () => {
    const largeur = 1;
    const hauteur = 5;
    const resultat = DessinerRectangle.generer(largeur, hauteur);
    expect(resultat.length).toEqual(hauteur);
    resultat.forEach((ligne) => {
      expect(ligne.length).toEqual(largeur);
    });
    expect(resultat[0]).toEqual("o");
    for (let i = 1; i < resultat.length - 2; i++) {
      expect(resultat[i]).toEqual("|");
    }

    expect(resultat[0]).toEqual(resultat[resultat.length - 1]);
  });

  test("doit generer un rectangle de 1 par 1", () => {
    const largeur = 1;
    const hauteur = 1;
    const resultat = DessinerRectangle.generer(largeur, hauteur);
    expect(resultat.length).toEqual(hauteur);
    resultat.forEach((ligne) => {
      expect(ligne.length).toEqual(largeur);
    });
    expect(resultat[0]).toEqual("o");
  });

  test("doit generer un rectangle de 2 par 2", () => {
    const largeur = 2;
    const hauteur = 2;
    const resultat = DessinerRectangle.generer(largeur, hauteur);
    expect(resultat.length).toEqual(hauteur);
    resultat.forEach((ligne) => {
      expect(ligne.length).toEqual(largeur);
    });
    expect(resultat[0]).toEqual("oo");
    expect(resultat[1]).toEqual("oo");
  });

  test("Generer une erreur pour un rectangle avec largeur négatives", () => {
    expect(() => DessinerRectangle.generer(-4, 3)).toThrowError(
      "Les dimensions du rectangle doivent être supérieur à 0"
    );
  });

  test("Generer une erreur pour un rectangle avec hauteur négatives", () => {
    expect(() => DessinerRectangle.generer(4, -3)).toThrowError(
      "Les dimensions du rectangle doivent être supérieur à 0"
    );
  });
});
