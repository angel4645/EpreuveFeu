type ligneMatrice = string[];
export interface ResulatMatrice {
  find: boolean;
  indexDepart?: number[];
  match?: string;
}
export class Matrice {
  private matrice: ligneMatrice[] = [];
  constructor(input: string) {
    this.genererMatrice(input);
  }

  private genererMatrice(input: string) {
    let ligne: ligneMatrice = [];
    for (const char of input) {
      if (char === "\n") {
        if (ligne.length > 0) {
          this.matrice.push(ligne);
          ligne = [];
        }
        continue;
      }
      ligne.push(char);
    }
    if (ligne.length > 0) {
      this.matrice.push(ligne);
    }
  }

  getMatrice() {
    return this.matrice;
  }

  isIncluse(matriceATrouver: Matrice): ResulatMatrice {
    const resultat: any = this.rechercheMatriceIncluse(matriceATrouver.matrice);
    if (!resultat.find) {
      return resultat;
    }
    resultat.match = this.genererMatriceMatch(
      resultat.indexDepart[1],
      resultat.indexDepart[0],
      matriceATrouver.matrice
    );
    return resultat;
  }

  private rechercheMatriceIncluse(matriceATrouver: ligneMatrice[]) {
    const indexLigRecMax = this.matrice.length - matriceATrouver.length;
    for (let ligneMatRef = 0; ligneMatRef <= indexLigRecMax; ligneMatRef++) {
      for (let colMatRef = 0; colMatRef < this.matrice[ligneMatRef].length; colMatRef++) {
        const match = this.comparaisonSousMatriceEtMatrice(ligneMatRef, colMatRef, matriceATrouver);
        if (match) {
          return {
            find: true,
            indexDepart: [colMatRef, ligneMatRef],
          };
        }
      }
    }
    return { find: false };
  }

  private comparaisonSousMatriceEtMatrice(ligne: number, colonne: number, sousMatrice: ligneMatrice[]) {
    for (let ligneMatRec = 0; ligneMatRec < sousMatrice.length; ligneMatRec++) {
      for (let colMatRec = 0; colMatRec < sousMatrice[ligneMatRec].length; colMatRec++) {
        const ligMatricePrincipal = ligne + ligneMatRec;
        const colMatricePrincipal = colonne + colMatRec;
        const caractereMatricePrincipal = this.getCaractereMatricePrincipal(ligMatricePrincipal, colMatricePrincipal);
        if (!this.matchValeurMatriceMatch(caractereMatricePrincipal, sousMatrice[ligneMatRec][colMatRec])) {
          return false;
        }
      }
    }
    return true;
  }

  private getCaractereMatricePrincipal(indexLigne: number, indexColonne) {
    return indexColonne >= this.matrice[indexLigne].length ? " " : this.matrice[indexLigne][indexColonne];
  }

  private matchValeurMatriceMatch(valeurMatrice, valeurSousMatrice) {
    if (valeurSousMatrice === " ") {
      return true;
    }
    return valeurMatrice === valeurSousMatrice;
  }

  private genererMatriceMatch(ligneMatch: number, colMatch: number, matriceATrouver: ligneMatrice[]): string {
    const matchMatrice: string[] = [];
    const maxIndexLigneMatch = ligneMatch + matriceATrouver.length - 1;
    for (let i = 0; i < this.matrice.length; i++) {
      const newLigne: string[] = [];
      for (let j = 0; j < this.matrice[i].length; j++) {
        if (i < ligneMatch || i > maxIndexLigneMatch) {
          newLigne.push(this.matrice[i][j] === " " ? " " : "-");
          continue;
        }
        const indexLigneSousMatrice = i - ligneMatch;
        const maxIndexColonneMatch = colMatch + matriceATrouver[indexLigneSousMatrice].length - 1;
        if (j < colMatch || j > maxIndexColonneMatch) {
          newLigne.push(this.matrice[i][j] === " " ? " " : "-");
          continue;
        }
        const indexColonneSousMatrice = j - colMatch;
        const curCaractSousMatrice = matriceATrouver[indexLigneSousMatrice][indexColonneSousMatrice];
        newLigne.push(curCaractSousMatrice !== " " ? curCaractSousMatrice : "-");
      }
      matchMatrice.push(newLigne.join(""));
    }
    return matchMatrice.join("\n");
  }
}
