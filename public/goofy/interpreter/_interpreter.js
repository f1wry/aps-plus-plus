const interpreter = (() => {
  let variables = {};
  function evalExpr(expr) {
    switch (expr.type) {
      case "identifier":
        {
          let output = variables[expr.value];
          return evalExpr(output);
        }
        break;
      case "functionCallExpr":
        {
          let output = evalStmt(expr);
          return output;
        }
        break;
      case "binaryExpr":
        {
          let left = evalExpr(expr.left);
          let right = evalExpr(expr.right);
          switch (expr.operator) {
            case "+": {
              return {
                type: "number",
                value: left.value + right.value,
              };
            }
            case "-": {
              return {
                type: "number",
                value: left.value - right.value,
              };
            }
            case "*": {
              return {
                type: "number",
                value: left.value * right.value,
              };
            }
            case "/": {
              return {
                type: "number",
                value: left.value / right.value,
              };
            }
          }
        }
        break;
      case "numericLiteral":
        {
          return {
            type: "number",
            value: expr.value,
          };
        }
        break;
      case "stringLiteral":
        {
          return {
            type: "string",
            value: expr.value,
          };
        }
        break;
    }
  }
  let lastOutput;
  function evalStmt(stmt) {
    switch (stmt.type) {
      case "switchExpr":
        {
          let discriminant = stmt.discriminant;
          let cases = stmt.cases;
          let defaultCase = stmt.default;
          for (let i = 0; i < cases.length; i++) {
            let currentCase = cases[i];
            alert(evalExpr(currentCase));
            if (
              evalExpr(currentCase.test.value[0]) === evalExpr(discriminant)
            ) {
              evalStmt(currentCase.consequent);
            }
          }
        }
        break;
      case "functionCallExpr":
        {
          switch (stmt.name) {
            case "print":
              {
                let values = stmt.block.value;
                let output = "";
                values.forEach((value) => {
                  let res = evalExpr(value);
                  switch (res.type) {
                    case "number":
                      {
                        output += res.value;
                      }
                      break;
                    case "string":
                      {
                        output += res.value.slice(1, -1);
                      }
                      break;
                  }
                });
                alert(output);
                lastOutput = {
                  type: "string",
                  value: output,
                };
              }
              break;
          }
        }
        break;
      case "variableDeclaration":
        {
          variables[stmt.name] = stmt.value;
          let res = evalExpr(stmt.value);
          switch (res.type) {
            case "number":
              {
                lastOutput = res.value;
              }
              break;
            case "string":
              {
                lastOutput = res.value.slice(1, -1);
              }
              break;
          }
        }
        break;
      case "variableAssignment":
        {
          if (variables[stmt.name] == null) {
            alert(
              "InterpreterError: The name " +
                stmt.name +
                " does not exist in the current scope"
            );
            return {};
          }
          variables[stmt.name] = stmt.value;
          let res = evalExpr(stmt.value); // go to ralsei.cpp
          switch (res.type) {
            case "number":
              {
                lastOutput = res.value;
              }
              break;
            case "string":
              {
                lastOutput = res.value.slice(1, -1);
              }
              break;
          }
        }
        break;
    }
    return lastOutput;
  }
  return (ast) => {
    variables = [];
    if (ast.type !== "program") {
      alert("InterpreterError: Unexpected AST node type " + ast.type);
      return;
    }
    if (!Array.isArray(ast.statements)) {
      alert(
        "InterpreterError: Unexpected AST statements list type " +
          typeof ast.statements
      );
      return;
    }
    lastOutput = "";
    ast.statements.forEach(evalStmt);
    return lastOutput;
  };
})();

export { interpreter };
