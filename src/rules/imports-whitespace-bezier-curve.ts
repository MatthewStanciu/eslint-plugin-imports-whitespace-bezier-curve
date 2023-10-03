import type { Rule } from "eslint";
import { Bezier } from "bezier-js";

const rule: Rule.RuleModule = {
  meta: {
    type: "layout",
    docs: {
      description:
        "Follow whitespace before imports along a cubic Bezier curve.",
      category: "Stylistic Issues",
      recommended: false,
    },
    fixable: "code",
  },
  create: function (context) {
    return {
      Program: function (_node) {
        const sourceCode = context.sourceCode;
        const imports = sourceCode.ast.body.filter(
          (node) => node.type === "ImportDeclaration"
        );

        if (!imports.length) return;

        const curve = new Bezier(0, 0, 0, 25, 25, 0, 25, 25);

        const tValues = imports.map((_, i) => i / (imports.length - 1));
        const targetLengths = tValues.map((t) => {
          const point = curve.get(t);
          return point.y;
        });

        const importsSortedLeastToGreatest = imports.slice().sort((a, b) => {
          const aLength = context.sourceCode.getText(a).length;
          const bLength = context.sourceCode.getText(b).length;

          return aLength - bLength;
        });

        const bezierImports = importsSortedLeastToGreatest.map((imp, i) => {
          const text = context.sourceCode.getText(imp);
          return " ".repeat(targetLengths[i]) + text;
        });

        let discrepancyFound = false;
        for (let i = 0; i < imports.length; i++) {
          const importNode = imports[i];
          const importRange = importNode.range;
          if (!importNode || !importRange) return;
          const sourceCode = context.sourceCode;

          const lineStart = sourceCode.getIndexFromLoc({
            line: importNode.loc!.start.line,
            column: 0,
          });

          const textWithLeadingWhitespace = sourceCode.text.slice(
            lineStart,
            importRange[1] // 0 = "start", 1 = "end"
          );

          if (textWithLeadingWhitespace !== bezierImports[i]) {
            discrepancyFound = true;
            break;
          }
        }

        if (discrepancyFound) {
          const start = imports[0].loc!.start;
          const end = imports[imports.length - 1].loc!.end;
          context.report({
            loc: {
              start,
              end,
            },
            message:
              "Whitespace before your imports must follow this cubic Bezier curve: https://doggo.ninja/4NCe4v.png",
            fix: (fixer) => {
              const bezierImportsText = bezierImports.join("\n");
              return fixer.replaceTextRange(
                [
                  sourceCode.getIndexFromLoc(start),
                  sourceCode.getIndexFromLoc(end),
                ],
                bezierImportsText
              );
            },
          });
        }
      },
    };
  },
};

export default rule;
