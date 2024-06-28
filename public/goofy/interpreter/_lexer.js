function tokenize(string) {
  let regexp =
    /("[^\n"]{0,}")|([0-9]{1,}\.[0-9]{1,})|(-{0,}[0-9]{1,})|([a-zA-Z_][0-9a-zA-Z_]{0,})|([+\-*\/]=)|[{}[\]+\-*\/=.,\(\)]/g;
  let tokens = string.match(regexp);
  if (string.match(/;/g)) {
    alert("LexerError: This isn't JavaScript");
    return [];
  }
  return tokens;
}
function refineTokens(tokens) {
  let output = [];
  tokens.forEach((t) => {
    if ("" + parseFloat(t) === t) {
      output.push({
        type: "numberToken",
        value: parseFloat(t),
      });
    } else if (["return", "switch", "break"].includes(t)) {
      output.push({
        type: t + "Token",
        value: t,
      });
    } else if (["var"].includes(t)) {
      output.push({
        type: "variableDeclarationToken",
        value: t,
      });
    } else if (t[0] === '"') {
      output.push({
        type: "stringToken",
        value: t,
      });
    } else if (t === "{") {
      output.push({
        type: "braceToken",
        value: "open",
      });
    } else if (t === "}") {
      output.push({
        type: "braceToken",
        value: "close",
      });
    } else if (t === "(") {
      output.push({
        type: "bracketToken",
        value: "open",
      });
    } else if (t === ")") {
      output.push({
        type: "bracketToken",
        value: "close",
      });
    } else if (t.match(/([+\-*\/]=)/g)) {
      output.push({
        type: "binaryExprAssignmentToken",
        value: t,
      });
    } else if (t === "=") {
      output.push({
        type: "equalsToken",
        value: t,
      });
    } else if (t.match(/[+\-*\/]/g)) {
      output.push({
        type: "binaryExprToken",
        value: t,
      });
    } else if (t.match(/[+\-*\/=.,]/g)) {
      output.push({
        type: "specialToken",
        value: t,
      });
    } else {
      output.push({
        type: "identifierToken",
        value: t,
      });
    }
  });
  output.push({
    type: "endOfFileToken",
    value: "",
  });
  return output;
}

export { tokenize, refineTokens };
