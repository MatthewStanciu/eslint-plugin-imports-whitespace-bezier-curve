import importsWhitespaceBezierCurve from "./rules/imports-whitespace-bezier-curve";

const config = {
  rules: {
    "imports-whitespace-bezier-curve": importsWhitespaceBezierCurve,
  },
  configs: {
    recommended: {
      rules: {
        "import-sort-bezier-curve/imports-whitespace-bezier-curve": 2,
      },
    },
  },
};

export default config;
