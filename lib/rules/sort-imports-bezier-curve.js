const { calculatePercentile } = require("../utils");
const { Bezier } = require("bezier-js");

module.exports = {
  meta: {
    type: "layout",
    docs: {
      description: "Sort imports along a cubic bezier curve",
      category: "Stylistic Issues",
      recommended: false,
    },
    fixable: "code",
  },
  create: function (context) {
    return {
      Program: function (_node) {
        const sourceCode = context.getSourceCode();
        const imports = sourceCode.ast.body.filter(
          (node) => node.type === "ImportDeclaration"
        );

        if (!imports.length) return;

        const importLengths = imports.map(
          (imp) => context.getSourceCode().getText(imp).length
        );

        const minLen = Math.min(...importLengths);
        const maxLen = Math.max(...importLengths);

        const curve = new Bezier(
          0,
          minLen,
          0.1 * maxLen,
          0.2 * minLen,
          0.8 * maxLen,
          0.9 * maxLen,
          maxLen,
          maxLen
        );

        const tValues = imports.map((_, i) => i / (imports.length - 1));
        const targetLengths = tValues.map((t) => {
          const point = curve.get(t);
          return point.y;
        });

        const importsSortedLeastToGreatest = imports.slice().sort((a, b) => {
          const aLength = context.getSourceCode().getText(a).length;
          const bLength = context.getSourceCode().getText(b).length;

          return aLength - bLength;
        });

        const sortedImportText = importsSortedLeastToGreatest.map((imp, i) => {
          const text = context.getSourceCode().getText(imp);
          let diff = text.length - targetLengths[i];
          return " ".repeat(diff < 0 ? 0 : diff) + text;
        });

        let discrepancyFound = false;
        for (let i = 0; i < imports.length; i++) {
          const importNode = imports[i];
          const importRange = importNode.range;
          const sourceCode = context.getSourceCode();

          const lineStart = sourceCode.getIndexFromLoc({
            line: importNode.loc.start.line,
            column: 0,
          });

          const textWithLeadingWhitespace = sourceCode.text.slice(
            lineStart,
            importRange[1] // 0 = "start", 1 = "end"
          );

          if (textWithLeadingWhitespace !== sortedImportText[i]) {
            discrepancyFound = true;
            break;
          }
        }

        if (discrepancyFound) {
          const start = imports[0].loc.start;
          const end = imports[imports.length - 1].loc.end;
          context.report({
            loc: {
              start,
              end,
            },
            message: "Imports must be sorted along a cubic bezier curve.",
            fix: (fixer) => {
              const sortedImportFinalText = sortedImportText.join("\n");
              return fixer.replaceTextRange(
                [
                  sourceCode.getIndexFromLoc(start),
                  sourceCode.getIndexFromLoc(end),
                ],
                sortedImportFinalText
              );
            },
          });
        }
      },
    };
  },
};
