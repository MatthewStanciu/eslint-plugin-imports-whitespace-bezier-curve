module.exports = {
  rules: {
    "imports-whitespace-bezier-curve": require("./rules/imports-whitespace-bezier-curve"),
    "imports-sort-quadratic-bezier-curve": require("./rules/imports-sort-quadratic-bezier-curve"),
  },
  configs: {
    recommended: {
      rules: {
        "import-sort-bezier-curve/imports-whitespace-bezier-curve": 2,
        "import-sort-bezier-curve/imports-sort-quadratic-bezier-curve": 2,
      },
    },
  },
};
