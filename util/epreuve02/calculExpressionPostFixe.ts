export class CalculExpressionPostFixe {
  private static stack: number[];
  constructor() {}

  public static resultatExpression(evaluation: string[]) {
    this.stack = [];
    evaluation.forEach((exp) => {
      const nombre = this.convertNumber(exp);
      if (nombre) {
        this.ajoutStack(nombre);
        return;
      }
      this.traitementOperation(exp);
    });
    const resultatFinal = this.getElementStack();
    return resultatFinal;
  }

  private static traitementOperation(operande: string) {
    const operandeDroite = this.getElementStack();
    const operandeGauche = this.getElementStack();
    const resultatOperation = this.getResultatOperation(
      operande,
      operandeGauche,
      operandeDroite
    );
    this.ajoutStack(resultatOperation);
  }

  private static getResultatOperation(
    operateur: string,
    operandeGauche: number,
    operandeDroite: number
  ): number {
    switch (operateur) {
      case "+":
        return operandeGauche + operandeDroite;
      case "-":
        return operandeGauche - operandeDroite;
      case "*":
        return operandeGauche * operandeDroite;
      case "/":
        return operandeGauche / operandeDroite;
      case "%":
        return operandeGauche % operandeDroite;
    }
  }

  private static convertNumber(valeur: string) {
    const numberInt = parseInt(valeur);
    if (!isNaN(numberInt)) {
      return numberInt;
    }
    return undefined;
  }

  private static ajoutStack(valeur: number) {
    this.stack.push(valeur);
  }

  private static getElementStack(): number {
    if (this.stack.length === 0) {
      return undefined;
    }
    return this.stack.pop();
  }
}
