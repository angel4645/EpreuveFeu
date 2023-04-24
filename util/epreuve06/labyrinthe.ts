enum TypeCase {
  DEPART = "depart",
  SORTIE = "sortie",
  PLEIN = "plein",
  VIDE = "vide",
}

class Case {
  voisins: Case[] = [];
  valeur: number;
  precedent: Case;
  visiter: boolean;
  isPlusCourtChemin: boolean;
  constructor(private ligne: number, private colonne: number, private typeCase: TypeCase) {
    this.initialisationDijsktra();
  }

  public addVoisin(voisin: Case) {
    if (this.voisins.length >= 4) {
      throw new Error(`La case (${this.colonne},${this.ligne}) a déjà 4 voisins de défini`);
    }
    this.voisins.push(voisin);
  }

  getTypeCase() {
    return this.typeCase;
  }

  public initialisationDijsktra() {
    this.precedent = undefined;
    this.visiter = false;
    this.valeur = this.getTypeCase() === TypeCase.DEPART ? 0 : Number.MAX_SAFE_INTEGER;
    this.isPlusCourtChemin = false;
  }
}

export interface ResultatLabyrinthe {
  nombreCaseChemin: number;
  solution: string;
}

export class Labyrinthe {
  private labyrinthe: Case[][] = [];
  constructor(
    private grille: string[],
    private caractereDepart: string,
    private caractereSortie: string,
    private caractereVide: string,
    private caracterePlein: string,
    private caractereChemin: string
  ) {
    this.genererStructure();
    this.ajouterVoisinsCaseLabyrinthe();
  }

  private genererStructure() {
    for (let i = 0; i < this.grille.length; i++) {
      const ligneLabyrinthe: Case[] = [];
      for (let j = 0; j < this.grille[i].length; j++) {
        const typeCase = this.determinerTypeCase(this.grille[i][j]);
        ligneLabyrinthe.push(new Case(i, j, typeCase));
      }
      this.labyrinthe.push(ligneLabyrinthe);
    }
  }

  private determinerTypeCase(input: string) {
    switch (input) {
      case this.caractereDepart:
        return TypeCase.DEPART;
      case this.caractereSortie:
        return TypeCase.SORTIE;
      case this.caractereVide:
        return TypeCase.VIDE;
      case this.caracterePlein:
        return TypeCase.PLEIN;
    }
    throw new Error(`Le caractère "${input}" n’est pas autorisé au sein de l’input de la grille du labyrinthe`);
  }

  private ajouterVoisinsCaseLabyrinthe() {
    for (let i = 0; i < this.labyrinthe.length; i++) {
      for (let j = 0; j < this.labyrinthe[i].length; j++) {
        if (this.labyrinthe[i][j].getTypeCase() === TypeCase.PLEIN) {
          continue;
        }
        const current = this.labyrinthe[i][j];
        if (i - 1 >= 0) {
          this.ajoutVoisin(i - 1, j, current);
        }
        if (i + 1 < this.labyrinthe.length) {
          this.ajoutVoisin(i + 1, j, current);
        }
        if (j - 1 >= 0) {
          this.ajoutVoisin(i, j - 1, current);
        }
        if (j + 1 < this.labyrinthe[i].length) {
          this.ajoutVoisin(i, j + 1, current);
        }
      }
    }
  }

  private ajoutVoisin(iVoisin: number, jVoisin: number, current: Case) {
    const voisin = this.labyrinthe[iVoisin][jVoisin];
    if (voisin.getTypeCase() !== TypeCase.PLEIN) {
      current.addVoisin(voisin);
    }
  }

  public executer() {
    const queueCase: Case[] = this.genererListeCaseAVisiter();
    this.recherchePlusCourtChemin(queueCase);

    let sortiePlusProche = queueCase.find((x) => x.getTypeCase() === TypeCase.SORTIE);
    queueCase.forEach((c) => {
      if (c.getTypeCase() === TypeCase.SORTIE && c.valeur < sortiePlusProche.valeur) {
        sortiePlusProche = c;
      }
    });

    let plusCourtChemin: Case[] = [];
    let derniereCaseParcouru = sortiePlusProche;
    while (derniereCaseParcouru !== undefined) {
      derniereCaseParcouru.isPlusCourtChemin = true;
      plusCourtChemin.push(derniereCaseParcouru);
      derniereCaseParcouru = derniereCaseParcouru.precedent;
    }
    plusCourtChemin.reverse();
    const grille: string = this.genererSolution();
    const resultat: ResultatLabyrinthe = {
      nombreCaseChemin: plusCourtChemin.length - 2,
      solution: grille,
    };
    return resultat;
  }

  private genererSolution(): string {
    const solution: string[] = [];
    for (const ligne of this.labyrinthe) {
      const solutionLigne: string[] = [];
      for (const colonne of ligne) {
        solutionLigne.push(this.getCaractereSolution(colonne));
      }
      solution.push(solutionLigne.join(""));
    }
    return solution.join("\n");
  }

  private getCaractereSolution(c: Case) {
    if (c.getTypeCase() === TypeCase.PLEIN) {
      return this.caracterePlein;
    }
    if (c.getTypeCase() === TypeCase.DEPART) {
      return this.caractereDepart;
    }
    if (c.getTypeCase() === TypeCase.SORTIE) {
      return this.caractereSortie;
    }
    return c.isPlusCourtChemin ? this.caractereChemin : this.caractereVide;
  }

  private recherchePlusCourtChemin(queueCase: Case[]) {
    while (this.continuerRecherche(queueCase)) {
      const caseMinimum = this.rechercheCaseValeurMinimum(queueCase);
      caseMinimum.visiter = true;
      caseMinimum.voisins.forEach((voisin) => {
        if (voisin.getTypeCase() === TypeCase.PLEIN || voisin.visiter) {
          return;
        }
        const distance = caseMinimum.valeur + 1;
        if (distance < voisin.valeur) {
          voisin.valeur = distance;
          voisin.precedent = caseMinimum;
        }
      });
    }
  }

  private genererListeCaseAVisiter() {
    const queueCase: Case[] = [];
    for (const ligne of this.labyrinthe) {
      for (const colonne of ligne) {
        if (colonne.getTypeCase() !== TypeCase.PLEIN) {
          colonne.initialisationDijsktra();
          queueCase.push(colonne);
        }
      }
    }
    return queueCase;
  }

  private rechercheCaseValeurMinimum(queueCase: Case[]) {
    let caseValMinimum = queueCase.find((x) => x.visiter === false);
    queueCase.forEach((c) => {
      if (c.visiter || c.valeur >= caseValMinimum.valeur) {
        return;
      }
      caseValMinimum = c;
    });
    return caseValMinimum;
  }

  private continuerRecherche(queue: Case[]) {
    const find = queue.find((x) => x.visiter === false);
    return find !== undefined;
  }
}
