import importsWhitespaceBezierCurve from "./rules/imports-whitespace-bezier-curve";

const config = {
  rules: {
    "imports-whitespace-bezier-curve": importsWhitespaceBezierCurve,
  },
  configs: {
    recommended: {
      rules: {
        "imports-whitespace-bezier-curve/imports-whitespace-bezier-curve": 2,
      },
    },
  },
};

export = config;
