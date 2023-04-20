import { Case } from "./case";
import { Groupe } from "./groupe";

export class Sudoku {
  nombrePossibilite = 0;
  nombreTest = 0;
  private listeCase: Case[] = [];
  private mapGroupe: Map<string, Groupe> = new Map();

  constructor(private input: string) {
    this.initialisation();
  }

  private initialisation() {
    for (const i of this.input) {
      if (i === "\n") {
        continue;
      }
      this.listeCase.push(new Case(i));
    }
    if (this.listeCase.length !== 81) {
      throw new Error("Grille Sudoku non valide");
    }
  }

  public resoudre() {
    this.creationGroupe();
    const listeCaseADeterminer = this.listeCase.filter((x) => !x.lectureSeul);
    const resultat = this.determinerValeurRecursif(listeCaseADeterminer, 0);
    let solution = "";
    if (resultat) {
      solution = this.getPrintSolution();
    }
    return {
      resolu: resultat,
      solution: solution,
    };
  }

  getPrintSolution() {
    const solution: string[] = [];
    for (let i = 0; i < this.listeCase.length; i++) {
      if (i % 9 === 0 && i !== 0) {
        solution.push("\n");
      }
      solution.push(this.listeCase[i].getValeur());
    }
    return solution.join("");
  }

  private creationGroupe() {
    this.mapGroupe = new Map();
    for (let i = 0; i < this.listeCase.length; i++) {
      const c = this.listeCase[i];
      const h = Math.trunc(i / 9);
      this.addValeurGroupe(`h${h}`, c);
      const v = i % 9;
      this.addValeurGroupe(`v${v}`, c);
      const g = this.determinerIndiceGroupe(h, v);
      this.addValeurGroupe(`g${g}`, c);
    }
  }

  private determinerIndiceGroupe(indiceH: number, indiceV: number) {
    if (this.isInterval(indiceH, 0, 2) && this.isInterval(indiceV, 0, 2)) {
      return 0;
    }
    if (this.isInterval(indiceH, 0, 2) && this.isInterval(indiceV, 3, 5)) {
      return 1;
    }
    if (this.isInterval(indiceH, 0, 2) && this.isInterval(indiceV, 6, 8)) {
      return 2;
    }
    if (this.isInterval(indiceH, 3, 5) && this.isInterval(indiceV, 0, 2)) {
      return 3;
    }
    if (this.isInterval(indiceH, 3, 5) && this.isInterval(indiceV, 3, 5)) {
      return 4;
    }
    if (this.isInterval(indiceH, 3, 5) && this.isInterval(indiceV, 6, 8)) {
      return 5;
    }
    if (this.isInterval(indiceH, 6, 8) && this.isInterval(indiceV, 0, 2)) {
      return 6;
    }
    if (this.isInterval(indiceH, 6, 8) && this.isInterval(indiceV, 3, 5)) {
      return 7;
    }
    if (this.isInterval(indiceH, 6, 8) && this.isInterval(indiceV, 6, 8)) {
      return 8;
    }
    throw new Error(`Determination du groupe impossible, h: ${indiceH} et v: ${indiceV}`);
  }

  private isInterval(indice: number, min: number, max: number) {
    if (indice >= min && indice <= max) {
      return true;
    }
    return false;
  }

  private addValeurGroupe(keyGroupe: string, c: Case) {
    if (!this.mapGroupe.has(keyGroupe)) {
      this.mapGroupe.set(keyGroupe, new Groupe());
    }
    const g = this.mapGroupe.get(keyGroupe);
    g.addCase(c);
    c.ajouterGroupe(g);
  }

  private determinerValeurRecursif(listeCaseACalculer: Case[], indexCourant: number) {
    if (indexCourant === listeCaseACalculer.length) {
      return this.VerifierGrille();
    }
    const caseCourante = listeCaseACalculer[indexCourant];
    caseCourante.reinitValeur();
    caseCourante.calculListeValeurPossibleInstantT();
    let resultat = true;
    let nextValue = caseCourante.getNextValeurPossible();
    if (nextValue === undefined) {
      return false;
    }
    do {
      caseCourante.setValeur(nextValue);
      resultat = this.determinerValeurRecursif(listeCaseACalculer, indexCourant + 1);
      if (resultat) {
        return true;
      }
      nextValue = caseCourante.getNextValeurPossible();
    } while (nextValue && !resultat);
    caseCourante.reinitValeur();
    return false;
  }

  private VerifierGrille() {
    for (const g of this.mapGroupe.values()) {
      const isValide = g.groupeValide();
      if (!isValide) {
        return false;
      }
    }
    return true;
  }
}
