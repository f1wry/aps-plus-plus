# CHAT

---

## MLG:

back to developing mlgmode frfr :)
was gonna replace the player name with 'ralseiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii'

wait ima brb

---

## FLOWEY:

zzz

---

## TESTING:

- ASTs
  - basically just a JSON object that the interpreter can read
  - mine are a bit simpler
  ```
  {
    "type": "program",
    "statements": [
      {
        "type": "variableDeclaration",
        "kind": "var",
        "name": "i",
        "value": {
          "type": "numericLiteral",
          "value": 10
        }
      }
    ]
  }
  ```
  - idea: should i make functions defined like this?
  ```
  var functionname = {
    parameters { a, b }
    print {
      "Hello World!"
    }
  }
  ```
  - it'd probably be easier to implement since i could make a `functionParameterExpr` type, and use it inside the `blockStmt` that is the function body
