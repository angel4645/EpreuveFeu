enum TypeToken {
  NUMBER,
  OPERATEUR,
  PARENTHESE_GAUCHE,
  PARENTHESE_DROITE,
}

export class StringToToken {
  public type: TypeToken;
  constructor(public readonly value: string) {
    this.type = this.determinerType();
  }

  private determinerType(): TypeToken {
    const numberInt = parseInt(this.value);
    if (!isNaN(numberInt)) {
      return TypeToken.NUMBER;
    }
    switch (this.value) {
      case "(":
        return TypeToken.PARENTHESE_GAUCHE;
      case ")":
        return TypeToken.PARENTHESE_DROITE;
      default:
        return TypeToken.OPERATEUR;
    }
  }

  public isNumber() {
    return this.type === TypeToken.NUMBER;
  }

  public isParentheseGauche() {
    return this.type === TypeToken.PARENTHESE_GAUCHE;
  }

  public isParentheseDroite() {
    return this.type === TypeToken.PARENTHESE_DROITE;
  }

  public compareTo(b: StringToToken) {
    const valThis = this.getPrioriteType();
    const valB = b.getPrioriteType();
    if (valThis === valB) {
      return 0;
    }
    return valThis < valB ? -1 : 1;
  }

  private getPrioriteType(): number {
    switch (this.type) {
      case TypeToken.PARENTHESE_GAUCHE:
        return 0;
      case TypeToken.PARENTHESE_DROITE:
        return 3;
      case TypeToken.OPERATEUR:
        return this.getPrioriteOperande();
    }
  }
  getPrioriteOperande(): number {
    switch (this.value) {
      case "+":
        return 1;
      case "-":
        return 1;
      case "*":
        return 2;
      case "/":
        return 2;
      case "%":
        return 2;
    }
  }
}
