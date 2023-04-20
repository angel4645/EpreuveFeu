import { Groupe } from "./groupe";

export class Case {
  public lectureSeul: boolean;
  private valeur: string;
  valeursDisponible: string[] = [];
  listeGroupe: Groupe[] = [];

  constructor(input: string) {
    if (input === ".") {
      this.lectureSeul = false;
      this.valeur = undefined;
    } else {
      this.lectureSeul = true;
      this.valeur = input;
    }
  }
  reinitValeur() {
    if (this.lectureSeul) {
      throw new Error("La case est en lecture seule !");
    }
    this.valeur = undefined;
  }
  ajouterValeurPossible(valeurPossible: string) {
    if (this.lectureSeul) {
      throw new Error("La case est en lecture seule !");
    }
    if (this.valeursDisponible.find((x) => x === valeurPossible)) {
      return;
    }
    this.valeursDisponible.push(valeurPossible);
  }

  ajouterListeValeurPossible(listeValeurPossible: string[]) {
    if (this.lectureSeul) {
      throw new Error("La case est en lecture seule !");
    }
    if (this.valeursDisponible.length === 0) {
      this.valeursDisponible = [...listeValeurPossible];
      return;
    }
    this.valeursDisponible = this.valeursDisponible.filter((x) => listeValeurPossible.includes(x));
  }

  ajouterGroupe(g: Groupe) {
    this.listeGroupe.push(g);
  }

  calculListeValeurPossibleInstantT() {
    this.valeursDisponible = [];
    this.listeGroupe.forEach((g) => {
      const valG = g.getInstantTValeurPossible();
      if (this.valeursDisponible.length === 0) {
        this.valeursDisponible = valG;
        return;
      }
      this.valeursDisponible = this.valeursDisponible.filter((x) => valG.includes(x));
    });
  }

  isGroupeValideInstantT() {
    for (const g of this.listeGroupe) {
      const val = g.validePartiellement();
      if (!val) {
        return false;
      }
    }
    return true;
  }

  getNombreValeurPossible() {
    return this.valeursDisponible.length;
  }
  getValeur() {
    return this.valeur;
  }

  getNextValeurPossible() {
    if (this.lectureSeul) {
      throw new Error("La case est en lecture seule !");
    }
    if (this.valeursDisponible.length === 0) {
      throw new Error("Aucune valeur possible n’a été initialisé !");
    }
    if (this.valeur === undefined) {
      return this.valeursDisponible[0];
    }
    const indexValeurCourrante = this.valeursDisponible.findIndex((x) => x === this.valeur);
    if (indexValeurCourrante === this.valeursDisponible.length - 1) {
      return undefined;
    }
    return this.valeursDisponible[indexValeurCourrante + 1];
  }

  setValeur(input: string) {
    if (this.lectureSeul) {
      throw new Error("La case est en lecture seule !");
    }
    const findIndex = this.valeursDisponible.findIndex((x) => x === input);
    if (findIndex === -1) {
      throw new Error("La valeur ne fait pas partie des possibilitées");
    }
    this.valeur = input;
  }
}
