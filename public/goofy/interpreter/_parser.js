const parse = (() => {
  let tokens;
  function parseStmt() {
    return parseExpr();
  }
  function parseExpr() {
    return parseSwitchExpr();
  }
  function parseSwitchExpr() {
    if (tokens[0].type === "switchToken") {
      tokens.shift();
      let blocks = [parseExpr(), parseExpr(), parseExpr()];
      let cases = [];
      for (let i = 0; i < blocks[1].value.length; i += 2) {
        cases.push({
          test: blocks[1].value[i],
          consequent: blocks[1].value[i + 1],
        });
      }
      return {
        type: "switchExpr",
        discriminant: blocks[0],
        cases: cases,
        default: blocks[2],
      };
    }
    return parseReturnExpr();
  }
  function parseReturnExpr() {
    let value = parseFunctionCallExpr();
    if (
      value.type === "return" &&
      tokens[0].type === "braceToken" &&
      tokens[0].value === "open"
    ) {
      return {
        type: "returnExpr",
        block: parseExpr(),
      };
    }
    return value;
  }
  function parseFunctionCallExpr() {
    let value = parseAdditiveExpr();
    if (
      value.type === "identifier" &&
      tokens[0].type === "braceToken" &&
      tokens[0].value === "open"
    ) {
      return {
        type: "functionCallExpr",
        name: value.value,
        block: parseExpr(),
      };
    }
    return value;
  }
  function parseAdditiveExpr() {
    let left = parseMultiplicativeExpr();
    while (tokens[0].value === "+" || tokens[0].value === "-") {
      const operator = tokens.shift().value;
      const right = parseMultiplicativeExpr();

      left = {
        type: "binaryExpr",
        operator: operator,
        left: left,
        right: right,
      };
    }

    return left;
  }
  function parseMultiplicativeExpr() {
    let left = parsePrimaryExpr();
    while (tokens[0].value === "*" || tokens[0].value === "/") {
      const operator = tokens.shift().value;
      const right = parsePrimaryExpr();

      left = {
        type: "binaryExpr",
        operator: operator,
        left: left,
        right: right,
      };
    }

    return left;
  }
  function parsePrimaryExpr() {
    let tk = tokens[0].type;
    switch (tk) {
      case "returnToken":
        tokens.shift();
        return {
          type: "returnStmt",
          value: "return",
        };
      case "breakToken":
        tokens.shift();
        return {
          type: "breakStmt",
          value: "break",
        };
      case "identifierToken":
        if (tokens[1].type === "equalsToken") {
          let variable = tokens.shift().value;
          tokens.shift();
          let value = parseExpr();
          return {
            type: "variableAssignment",
            name: variable,
            value: value,
          };
        }
        return {
          type: "identifier",
          value: tokens.shift().value,
        };
      case "numberToken":
        return {
          type: "numericLiteral",
          value: parseFloat(tokens.shift().value),
        };
      case "stringToken":
        return {
          type: "stringLiteral",
          value: tokens.shift().value,
        };
      case "bracketToken":
        if (tokens[0].value === "open") {
          tokens.shift();
          const value = parseExpr();
          tokens.shift();
          return value;
        }
        break;
      case "braceToken":
        if (tokens[0].value === "open") {
          let stmt = {
            type: "blockStmt",
            value: [],
          };
          let safetyLimit = 0;
          tokens.shift();
          blockStmtRepeat: while (safetyLimit < 4096 && tokens[0] != null) {
            if (
              tokens[0].type === "braceToken" &&
              tokens[0].value === "close"
            ) {
              break blockStmtRepeat;
            }
            stmt.value.push(parseExpr());
            safetyLimit++;
          }
          if (safetyLimit >= 4096) {
            alert(
              "ParsingError: Block statement too large or closing brace missing"
            );
          }
          tokens.shift();
          return stmt;
        }
        break;
      case "variableDeclarationToken":
        tokens.shift();
        let variable = tokens[0].value;
        tokens.shift();
        tokens.shift();
        let value = parseExpr();
        return {
          type: "variableDeclaration",
          name: variable,
          value: value,
        };
        break;
      default:
        alert("ParsingError: Unknown token type " + tk);
        tokens.shift();
        return {};
    }
  }
  return (tks) => {
    try {
      tokens = tks;

      let program = {
        type: "program",
        statements: [],
      };

      while (tokens[0].type !== "endOfFileToken") {
        program.statements.push(parseStmt());
      }

      return program;
    } catch (e) {
      alert(e);
    }
  };
})();

export { parse };
