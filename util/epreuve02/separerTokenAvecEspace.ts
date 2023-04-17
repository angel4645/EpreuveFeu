export class SeparerTokenAvecEspace {
  private static output: string[] = [];
  private static typeDernierTokenInserer: TypeToken = undefined;
  private static typeCurrentToken: TypeToken = undefined;

  private static init() {
    this.output = [];
    this.typeDernierTokenInserer = TypeToken.ESPACE;
  }
  public static executer(input: string) {
    this.init();
    let indexCurrentToken = 0;
    while (indexCurrentToken < input.length) {
      this.typeCurrentToken = this.getTypeToken(input[indexCurrentToken]);

      if (this.isDeuxEspacesConsecutif()) {
        indexCurrentToken++;
        continue;
      }

      if (this.isTokenASeparerParEspace()) {
        this.output.push(" ");
      }

      this.output.push(input[indexCurrentToken]);
      this.typeDernierTokenInserer = this.typeCurrentToken;
      indexCurrentToken++;
    }

    return this.output.join("").trimEnd();
  }

  private static isDeuxEspacesConsecutif() {
    return (
      this.typeCurrentToken === TypeToken.ESPACE &&
      this.typeDernierTokenInserer === TypeToken.ESPACE
    );
  }

  private static isTokenASeparerParEspace() {
    return (
      (this.typeDernierTokenInserer === TypeToken.NUMBER &&
        this.typeCurrentToken === TypeToken.AUTRE) ||
      (this.typeDernierTokenInserer === TypeToken.AUTRE &&
        this.typeCurrentToken === TypeToken.NUMBER) ||
      (this.typeDernierTokenInserer === TypeToken.AUTRE &&
        this.typeCurrentToken === TypeToken.AUTRE)
    );
  }

  private static getTypeToken(caracter: string) {
    if (this.isNumber(caracter)) {
      return TypeToken.NUMBER;
    }
    if (this.isEspace(caracter)) {
      return TypeToken.ESPACE;
    }
    return TypeToken.AUTRE;
  }

  private static isNumber(caractere: string): boolean {
    let reg = new RegExp("[0-9]");
    return reg.test(caractere);
  }

  private static isEspace(caractere: string): boolean {
    return caractere === " ";
  }
}

enum TypeToken {
  NUMBER,
  ESPACE,
  AUTRE,
}
