import { Case } from "./case";

export class Groupe {
  listeCase: Case[] = [];
  listeValeurPossible = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  constructor() {}

  addCase(c: Case) {
    this.listeCase.push(c);
    const valeurCase = c.getValeur();
    if (valeurCase) {
      const index = this.listeValeurPossible.findIndex((x) => x === valeurCase);
      if (index === -1) {
        throw new Error(`La valeur ${valeurCase} n’est pas disponible dans le groupe.`);
      }
      this.listeValeurPossible.splice(index, 1);
    }
  }

  getValeurPossible() {
    return [...this.listeValeurPossible];
  }

  structureValide() {
    return this.listeCase.length === 9;
  }

  groupeValide() {
    const listeValeurUnique: string[] = [];
    for (const c of this.listeCase) {
      const val = c.getValeur();
      if (val === undefined) {
        return false;
      }
      const find = listeValeurUnique.find((x) => val === x);
      if (find) {
        return false;
      }
      listeValeurUnique.push(val);
    }
    return listeValeurUnique.length === 9;
  }

  validePartiellement() {
    const listeValeurUnique: string[] = [];
    for (const c of this.listeCase) {
      const val = c.getValeur();
      if (val === undefined) {
        continue;
      }
      const find = listeValeurUnique.find((x) => val === x);
      if (find) {
        return false;
      }
      listeValeurUnique.push(val);
    }
    return true;
  }

  public addValeurPossibleCase() {
    this.listeCase.forEach((c) => {
      if (c.lectureSeul) {
        return;
      }
      c.ajouterListeValeurPossible(this.listeValeurPossible);
    });
  }

  public getInstantTValeurPossible() {
    const allValCase = this.listeCase.filter((c) => {
      if (c.lectureSeul || c.getValeur === undefined) {
        return false;
      }
      return true;
    });
    const allValeur = allValCase.map((c) => c.getValeur());
    return ["1", "2", "3", "4", "5", "6", "7", "8", "9"].filter((n) => !allValeur.includes(n));
  }
}
