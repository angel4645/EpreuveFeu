import { execFile } from "child_process";

interface ValidationInput {
  valide: boolean;
  erreur?: string;
}

interface Position {
  ligne: number;
  colonne: number;
}
export class PlusGrandCarre {
  private resolution: number[][];
  private tailleCarreTrouver: number;
  private indexDepartCarre: Position;
  private grilleSortie: string[];
  constructor(
    private grille: string[],
    private nbLigne: number,
    private vide: string,
    private obstacle: string,
    private plein: string
  ) {}

  isValide(): ValidationInput {
    if (this.grille.length === 0) {
      return this.genererRetourInvalide("La grille est vide");
    }
    const taillePremiereLigne = this.grille[0].length;
    for (const ligne of this.grille) {
      if (ligne.length < 1 || ligne.length !== taillePremiereLigne) {
        return this.genererRetourInvalide("La longeur des lignes non valide");
      }
      for (const c of ligne) {
        if (c !== this.vide && c !== this.obstacle) {
          return this.genererRetourInvalide(`Caractère non valide: ${c}`);
        }
      }
    }
    return { valide: true };
  }

  private genererRetourInvalide(message: string): ValidationInput {
    return { valide: false, erreur: message };
  }

  executer() {
    const validation = this.isValide();
    if (!validation.valide) {
      throw new Error(validation.erreur);
    }
    this.initialisationGrilleResolution();
    this.tailleCarreTrouver = undefined;
    this.indexDepartCarre = undefined;
    this.grilleSortie = undefined;

    this.tailleCarreTrouver = this.trouverPlusGrandCarre();
    this.indexDepartCarre = this.trouverPositionPlusGrandCarre();
    this.grilleSortie = this.genererGrilleSortie();
    const convertPosition =
      this.indexDepartCarre === undefined ? [-1, -1] : [this.indexDepartCarre.colonne, this.indexDepartCarre.ligne];
    return {
      taille: this.tailleCarreTrouver,
      position: convertPosition,
    };
  }

  private initialisationGrilleResolution() {
    this.resolution = [];
    for (const ligne of this.grille) {
      let resolutionLigne: number[] = [];
      for (const colonne of ligne) {
        switch (colonne) {
          case this.vide:
            resolutionLigne.push(1);
            break;
          case this.obstacle:
            resolutionLigne.push(-1);
            break;
        }
      }
      this.resolution.push(resolutionLigne);
    }
  }

  private trouverPlusGrandCarre() {
    if (!this.solutionTailleUnExiste()) {
      return 0;
    }
    let nouvelleTaille = 1;
    let trouverNouvelleTaille = true;
    while (trouverNouvelleTaille) {
      nouvelleTaille++;
      trouverNouvelleTaille = false;
      const decrementTailleRecherche = nouvelleTaille - 1;
      for (let l = 0; l < this.resolution.length - decrementTailleRecherche; l++) {
        const ligne = this.resolution[l];
        for (let c = 0; c < ligne.length - decrementTailleRecherche; c++) {
          if (ligne[c] === nouvelleTaille - 1 && this.caseAutourDeTailleInferieur(l, c, nouvelleTaille - 1)) {
            this.resolution[l][c] = nouvelleTaille;
            trouverNouvelleTaille = true;
          }
        }
      }
    }
    return nouvelleTaille - 1;
  }

  private solutionTailleUnExiste() {
    for (const ligne of this.resolution) {
      for (const colonne of ligne) {
        if (colonne === 1) {
          return true;
        }
      }
    }
    return false;
  }

  private caseAutourDeTailleInferieur(indexLigne: number, indexCol: number, tailleRecherche: number) {
    if (this.resolution[indexLigne + 1][indexCol] !== tailleRecherche) {
      return false;
    }
    if (this.resolution[indexLigne][indexCol + 1] !== tailleRecherche) {
      return false;
    }
    if (this.resolution[indexLigne + 1][indexCol + 1] !== tailleRecherche) {
      return false;
    }
    return true;
  }

  private trouverPositionPlusGrandCarre(): Position {
    if (!this.tailleCarreTrouver) {
      return undefined;
    }
    const allPosition: Position[] = [];
    const decrementTailleRecherche = this.tailleCarreTrouver - 1;
    for (let l = 0; l < this.resolution.length - decrementTailleRecherche; l++) {
      const ligne = this.resolution[l];
      for (let c = 0; c < ligne.length - decrementTailleRecherche; c++) {
        if (ligne[c] === this.tailleCarreTrouver) {
          allPosition.push({ ligne: l, colonne: c });
        }
      }
    }
    if (allPosition.length === 0) {
      return undefined;
    }
    if (allPosition.length === 1) {
      return allPosition[0];
    }
    return this.trouverPositionPlusHautAGauche(allPosition);
  }

  private trouverPositionPlusHautAGauche(listePosition: Position[]): Position {
    let listCalculPositionDistance = listePosition.map((x) => {
      return { ...x, distance: this.distanceAvecCoinSuperieur(x) };
    });
    const distMin = Math.min(...listCalculPositionDistance.map((x) => x.distance));
    const elementToReturn = listCalculPositionDistance.find((x) => x.distance === distMin);
    return { ligne: elementToReturn.ligne, colonne: elementToReturn.colonne };
  }

  private distanceAvecCoinSuperieur(point: Position): number {
    const distLigneCarre = Math.pow(point.ligne, 2);
    const distColCarre = Math.pow(point.colonne, 2);
    return Math.sqrt(distLigneCarre + distColCarre);
  }

  private genererGrilleSortie() {
    const output = [];
    for (let l = 0; l < this.resolution.length; l++) {
      const ligneSortie: string[] = [];
      for (let c = 0; c < this.resolution[l].length; c++) {
        if (this.indexDepartCarre !== undefined && this.positionGrilleInsideCarreSolution(l, c)) {
          ligneSortie.push(this.plein);
        } else {
          ligneSortie.push(this.resolution[l][c] === -1 ? this.obstacle : this.vide);
        }
      }
      output.push(ligneSortie.join(""));
    }
    return output;
  }

  private positionGrilleInsideCarreSolution(indLigne: number, indCol: number) {
    if (
      indLigne >= this.indexDepartCarre.ligne &&
      indLigne < this.indexDepartCarre.ligne + this.tailleCarreTrouver &&
      indCol >= this.indexDepartCarre.colonne &&
      indCol < this.indexDepartCarre.colonne + this.tailleCarreTrouver
    ) {
      return true;
    }
    return false;
  }

  public getGrilleSortie(): string {
    return this.grilleSortie.join("\n");
  }
}
