import { StringToToken } from "./stringToToken";

export class ConvertionEvaluationExpression {
  stackOperateur: StringToToken[];
  output: StringToToken[];
  input: StringToToken[];
  constructor(private evaluation: string[]) {}

  public ConvertionInfixeVersPostFixe() {
    this.init();
    this.input.forEach((tok) => {
      if (tok.isNumber()) {
        this.ajoutOutput(tok);
        return;
      }
      if (tok.isParentheseGauche()) {
        this.ajoutStackOperateur(tok);
        return;
      }
      if (tok.isParentheseDroite()) {
        this.DepilerStackParenthese();
        return;
      }
      this.gestionOperateur(tok);
    });
    while (this.viewElementStackOperateur()) {
      this.ajoutOutput(this.getElementStackOperateur());
    }
  }

  private gestionOperateur(tok: StringToToken) {
    let continueDepilerStack = true;
    while (continueDepilerStack) {
      const lastStringToToken = this.viewElementStackOperateur();
      if (
        lastStringToToken === undefined ||
        lastStringToToken.isParentheseGauche() ||
        tok.compareTo(lastStringToToken) > 0
      ) {
        this.ajoutStackOperateur(tok);
        continueDepilerStack = false;
        continue;
      }
      this.ajoutOutput(this.getElementStackOperateur());
    }
  }

  private DepilerStackParenthese() {
    let continueDepilerStack = true;
    while (continueDepilerStack) {
      const stackStringToToken = this.getElementStackOperateur();
      if (
        stackStringToToken === undefined ||
        stackStringToToken.isParentheseGauche()
      ) {
        continueDepilerStack = false;
        continue;
      }
      this.ajoutOutput(stackStringToToken);
    }
  }

  private init() {
    this.stackOperateur = [];
    this.output = [];
    this.input = this.evaluation.map((tok) => new StringToToken(tok));
  }

  private ajoutOutput(StringToToken: StringToToken) {
    this.output.push(StringToToken);
  }

  private ajoutStackOperateur(StringToToken: StringToToken) {
    this.stackOperateur.push(StringToToken);
  }

  private viewElementStackOperateur(): StringToToken {
    if (this.stackOperateur.length === 0) {
      return undefined;
    }
    return this.stackOperateur[this.stackOperateur.length - 1];
  }

  private getElementStackOperateur(): StringToToken {
    if (this.stackOperateur.length === 0) {
      return undefined;
    }
    return this.stackOperateur.pop();
  }

  public getEvalutionPostFixeToString() {
    const arrayString = this.output.map((tok) => tok.value);
    return arrayString.join(" ");
  }
}
