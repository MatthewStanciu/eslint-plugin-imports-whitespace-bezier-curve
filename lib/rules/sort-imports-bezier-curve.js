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
      Program: async function (_node) {
        const sourceCode = context.getSourceCode();
        const rawimports = sourceCode.ast.body.filter(
          (node) => node.type === "ImportDeclaration"
        );

        const importsnorm = rawimports.map((imp) => {
          return context.getSourceCode().getText(imp).replaceAll(/  +/gi, " ");
        });

        console.log("importsnorm");
        console.log(importsnorm);
        // return;

        if (!importsnorm.length) return;

        const importLengths = importsnorm.map((imp) => imp.length);

        const minLen = Math.min(...importLengths);
        const maxLen = Math.max(...importLengths);

        // input is from 0 to import length - 1, output is from minvalue to maxvalue
        const curve = new Bezier(
          0,
          minLen,

          importsnorm.length - 1,
          minLen,

          0,
          maxLen * 2,

          importsnorm.length - 1,
          maxLen * 2
        );

        const tValues = importsnorm.map((_, i) => (i + 1) / importsnorm.length);
        const targetLengths = tValues.map((t) => {
          const point = curve.get(t);
          // console.log("*".repeat(point.y));
          return point.y;
        });

        const leastToGreatestSortedImports = importsnorm
          .slice()
          .sort((a, b) => {
            const aLength = a.length;
            const bLength = b.length;

            return aLength - bLength;
          });

        // console.log(leastToGreatestSortedImports);

        const sortedImportText = leastToGreatestSortedImports.map((imp, i) => {
          const text = imp;
          let diff = targetLengths[i] - text.length;
          const idx = text.indexOf("import") + 6;
          diff = Math.round(diff);
          // console.log({ text });
          // console.log(imp.source);
          return (
            text.slice(0, idx) +
            " ".repeat(diff < 0 ? 0 : diff) + //+ text
            // "‍" +
            text.slice(idx)
          );
          // return " ".repeat(diff < 0 ? 0 : diff) + text;
        });
        console.log("sortedImportText");
        console.log(sortedImportText);
        // await new Promise((r) => setTimeout(r, 10000));

        let discrepancies = false;
        for (let i = 0; i < rawimports.length; i++) {
          let originalText = context.getSourceCode().getText(rawimports[i]);
          // originalText = originalText.replaceAll(/  +/gi, "");
          // console.log({ i });
          if (originalText !== sortedImportText[i]) {
            console.log(
              "og: `" +
                originalText +
                "`" +
                " is not equal: `" +
                sortedImportText[i] +
                "`"
            );
            discrepancies = true;
            break;
          }
        }
        // return;

        if (discrepancies) {
          const start = rawimports[0].loc.start;
          const end = rawimports[rawimports.length - 1].loc.end;
          context.report({
            loc: {
              start,
              end,
            },
            message: "Imports must be sorted along a cubic bezier curve.",
            fix: (fixer) => {
              const sortedImportTextFormatted = sortedImportText.join("\n");
              // console.log({ sortedImportText });
              // console.log({ sortedImportTextFormatted });
              return fixer.replaceTextRange(
                [
                  sourceCode.getIndexFromLoc(start),
                  sourceCode.getIndexFromLoc(end),
                ],
                sortedImportTextFormatted
                // "oh no oh no"
              );

              // return fixer.insertTextBeforeRange(
              //   [
              //     sourceCode.getIndexFromLoc(start),
              //     sourceCode.getIndexFromLoc(end),
              //   ],
              //   sortedImportTextFormatted
              //   // "oh no oh no"
              // );

              // return fixer.replaceText(
              //   imports
              //     .map((imp) => {
              //       return context.getSourceCode().getText(imp);
              //     })
              //     .join("\n"),
              //   sortedImportTextFormatted
              //   // "oh no oh no"
              // );
            },
          });
        }
      },
    };
  },
};
