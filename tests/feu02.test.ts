import { CalculExpressionPostFixe } from "../util/epreuve02/calculExpressionPostFixe";
import { ConvertionEvaluationExpression } from "../util/epreuve02/convertionEvaluationExpression";
import { SeparerTokenAvecEspace } from "../util/epreuve02/separerTokenAvecEspace";

describe("Preparer chaine caractère en séparant les tokens nécessaires", () => {
  test("Chaine valide n’a pas de modification en sortie", () => {
    const input = "4 + 5";
    const output = SeparerTokenAvecEspace.executer(input);
    expect(output).toEqual(input);
  });

  test("Input avec espace de chaque côté supprimer en sortie", () => {
    const input = " 4 + 5 ";
    const output = SeparerTokenAvecEspace.executer(input);
    expect(output).toEqual("4 + 5");
  });

  test("Input avec plusieurs espaces consécutif et nombre à plusieurs chiffre", () => {
    const input = " 123    +   789";
    const output = SeparerTokenAvecEspace.executer(input);
    expect(output).toEqual("123 + 789");
  });

  test("Input à multiple problème", () => {
    const input = " (4+5)*(78*8)  -    71-4 ";
    const output = SeparerTokenAvecEspace.executer(input);
    expect(output).toEqual("( 4 + 5 ) * ( 78 * 8 ) - 71 - 4");
  });
});

describe("Conversion infixe vers postfixe", () => {
  test("Conversion simple 4 + 5", () => {
    const infixe: string[] = "4 + 5".split(" ");

    const convert = new ConvertionEvaluationExpression(infixe);
    convert.ConvertionInfixeVersPostFixe();
    expect(convert.getEvalutionPostFixeToString()).toEqual("4 5 +");
  });

  test("Conversion 4 * 5 + 3", () => {
    const infixe: string[] = "4 * 5 + 3".split(" ");
    const convert = new ConvertionEvaluationExpression(infixe);
    convert.ConvertionInfixeVersPostFixe();
    expect(convert.getEvalutionPostFixeToString()).toEqual("4 5 * 3 +");
  });

  test("Conversion 4 + 5 * 3", () => {
    const infixe: string[] = "4 + 5 * 3".split(" ");
    const convert = new ConvertionEvaluationExpression(infixe);
    convert.ConvertionInfixeVersPostFixe();
    expect(convert.getEvalutionPostFixeToString()).toEqual("4 5 3 * +");
  });

  test("Conversion (A+B)*(C/D)", () => {
    const infixe: string[] = "( 1 + 2 ) * ( 4 / 5 )".split(" ");
    const convert = new ConvertionEvaluationExpression(infixe);
    convert.ConvertionInfixeVersPostFixe();
    expect(convert.getEvalutionPostFixeToString()).toEqual("1 2 + 4 5 / *");
  });

  test("Conversion A*(B*C+D*E)+F", () => {
    const infixe: string[] = "1 * ( 2 * 3 + 4 * 5 ) + 6".split(" ");
    const convert = new ConvertionEvaluationExpression(infixe);
    convert.ConvertionInfixeVersPostFixe();
    expect(convert.getEvalutionPostFixeToString()).toEqual(
      "1 2 3 * 4 5 * + * 6 +"
    );
  });

  test("Conversion  (A+B)*C+(D-E)/F+G", () => {
    const infixe: string[] = "( 1 + 2 ) * 3 + ( 4 - 5 ) / 6 + 7".split(" ");
    const convert = new ConvertionEvaluationExpression(infixe);
    convert.ConvertionInfixeVersPostFixe();
    expect(convert.getEvalutionPostFixeToString()).toEqual(
      "1 2 + 3 * 4 5 - 6 / + 7 +"
    );
  });
});

describe("Calcul evaluationpostfixe", () => {
  test("Calcul simple 4 5 +", () => {
    const postFixe: string[] = "4 5 +".split(" ");
    const resultat = CalculExpressionPostFixe.resultatExpression(postFixe);
    expect(resultat).toEqual(9);
  });

  test("Conversion 4 5 * 3 +", () => {
    const postFixe: string[] = "4 5 * 3 +".split(" ");
    const resultat = CalculExpressionPostFixe.resultatExpression(postFixe);
    expect(resultat).toEqual(23);
  });

  test("Conversion 4 5 3 * +", () => {
    const postFixe: string[] = "4 5 3 * +".split(" ");
    const resultat = CalculExpressionPostFixe.resultatExpression(postFixe);
    expect(resultat).toEqual(19);
  });

  test("Conversion 1 2 + 4 5 / *", () => {
    const postFixe: string[] = "1 2 + 4 5 / *".split(" ");
    const resultat = CalculExpressionPostFixe.resultatExpression(postFixe);

    expect(resultat.toFixed(1)).toEqual("2.4");
  });

  test("Conversion 1 2 3 * 4 5 * + * 6 +", () => {
    const postFixe: string[] = "1 2 3 * 4 5 * + * 6 +".split(" ");
    const resultat = CalculExpressionPostFixe.resultatExpression(postFixe);
    expect(resultat).toEqual(32);
  });

  test("Conversion  1 2 + 3 * 4 5 - 6 / + 7 +", () => {
    const postFixe: string[] = "1 2 + 3 * 4 5 - 6 / + 7 +".split(" ");
    const resultat = CalculExpressionPostFixe.resultatExpression(postFixe);
    expect(resultat.toFixed(1)).toEqual("15.8");
  });
});
