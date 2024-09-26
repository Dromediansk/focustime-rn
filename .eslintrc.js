module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "react-native"],
  rules: {
    "prettier/prettier": ["error", { trailingComma: "es5" }],
    "react-native/no-unused-styles": "error",
  },
};
