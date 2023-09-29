const { calculatePercentile } = require("../utils");
const { Bezier } = require("bezier-js");

module.exports = {
  meta: {
    type: "suggestion",
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

        const tValues = importLengths.map((len, i) => i / (len - 1));
        const targetLengths = tValues.map((t) => {
          const point = curve.get(t);
          return point.y;
        });

        const sortedImports = imports.slice().sort((a, b) => {
          const aLength = context.getSourceCode().getText(a).length;
          const bLength = context.getSourceCode().getText(b).length;

          const aDiff = Math.min(
            ...targetLengths.map((target) => Math.abs(aLength - target))
          );
          const bDiff = Math.min(
            ...targetLengths.map((target) => Math.abs(bLength - target))
          );

          return aDiff - bDiff;
        });

        let discrepancies = false;
        for (let i = 0; i < imports.length; i++) {
          if (imports[i] !== sortedImports[i]) {
            discrepancies = true;
            break;
          }
        }

        if (discrepancies) {
          const start = imports[0].loc.start;
          const end = imports[imports.length - 1].loc.end;
          context.report({
            loc: {
              start,
              end,
            },
            message: "Imports must be sorted along a cubic bezier curve.",
            fix: (fixer) => {
              const sortedImportText = sortedImports
                .map((importNode) =>
                  context.getSourceCode().getText(importNode)
                )
                .join("\n");
              return fixer.replaceTextRange(
                [
                  sourceCode.getIndexFromLoc(start),
                  sourceCode.getIndexFromLoc(end),
                ],
                sortedImportText
              );
            },
          });
        }
      },
    };
  },
};
