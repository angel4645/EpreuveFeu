import { Case } from "./case";

export class Groupe {
  listeCase: Case[] = [];
  listeValeurPossible = [];
  constructor() {}

  addCase(c: Case) {
    this.listeCase.push(c);
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

  public getInstantTValeurPossible() {
    const allValCase = this.listeCase.filter((c) => {
      if (c.getValeur() === undefined) {
        return false;
      }
      return true;
    });
    const allValeur = allValCase.map((c) => c.getValeur());
    this.listeValeurPossible = ["1", "2", "3", "4", "5", "6", "7", "8", "9"].filter((n) => !allValeur.includes(n));
    return this.listeValeurPossible;
  }
}
