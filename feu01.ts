import { exit } from "process";

export class DessinerRectangle {
  private static readonly COIN = "o";
  private static readonly HORIZONTAL = "-";
  private static readonly VERTICAL = "|";
  private static readonly VIDE = " ";

  public static generer(largeur: number, hauteur: number) {
    if (largeur <= 0 || hauteur <= 0) {
      throw new Error("Les dimensions du rectangle doivent être supérieur à 0");
    }
    const dessin = [];
    const topDown = this.getFormeLargeur(largeur, this.COIN, this.HORIZONTAL);
    if (hauteur === 1) {
      dessin.push(topDown);
    }
    if (hauteur === 2) {
      dessin.push(topDown);
      dessin.push(topDown);
    }
    const inside = this.getFormeLargeur(largeur, this.VERTICAL, this.VIDE);
    if (hauteur > 2) {
      dessin.push(topDown);
      for (let i = 0; i < hauteur - 2; i++) {
        dessin.push(inside);
      }
      dessin.push(topDown);
    }
    return dessin;
  }

  private static getFormeLargeur(
    largeur: number,
    extremite: string,
    interieur: string
  ) {
    if (largeur === 1) {
      return extremite;
    }
    if (largeur === 2) {
      return extremite.concat(extremite);
    }
    return extremite.concat(interieur.repeat(largeur - 2), extremite);
  }
}

if (process.argv.length < 4) {
  console.log("Le programme nécessite les arguments de largeur et hauteur !");
}

const argLargeur = parseInt(process.argv[2]);
const argHauteur = parseInt(process.argv[3]);
if (isNaN(argLargeur)) {
  console.log(
    `L’argument de largeur ${process.argv[2]} n’est pas un nombre valide`
  );
  exit(0);
}

if (isNaN(argHauteur)) {
  console.log(
    `L’argument de hauteur ${process.argv[3]} n’est pas un nombre valide`
  );
  exit(0);
}
try {
  const resultat = DessinerRectangle.generer(argLargeur, argHauteur);
  resultat.forEach((ligne) => console.log(ligne));
} catch (err) {
  console.log(err.message);
}
