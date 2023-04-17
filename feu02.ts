import { CalculExpressionPostFixe } from "./util/epreuve02/calculExpressionPostFixe";
import { ConvertionEvaluationExpression } from "./util/epreuve02/convertionEvaluationExpression";
import { SeparerTokenAvecEspace } from "./util/epreuve02/separerTokenAvecEspace";

if (process.argv.length < 3) {
  console.log("Le programme nécessite une expression valide a évaluer !");
}

try {
  const evaluationArgument = SeparerTokenAvecEspace.executer(process.argv[2]);
  const convertEvalToPostFixe = new ConvertionEvaluationExpression(
    evaluationArgument.split(" ")
  );
  convertEvalToPostFixe.ConvertionInfixeVersPostFixe();
  const resPostFixe = convertEvalToPostFixe.getEvalutionPostFixeToString();
  console.log(
    CalculExpressionPostFixe.resultatExpression(resPostFixe.split(" "))
  );
} catch (err) {
  console.log("Erreur:", err.message);
}
