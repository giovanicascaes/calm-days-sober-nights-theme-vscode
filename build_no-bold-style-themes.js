const cloneDeep = require("lodash/cloneDeep");
const prettier = require("prettier");
const fs = require("fs");
const lightTheme = require("./themes/calm-days-sober-nights-light.json");
const darkTheme = require("./themes/calm-days-sober-nights-dark.json");

[lightTheme, darkTheme].forEach((theme) => {
  const newTheme = cloneDeep(theme);

  newTheme.name = newTheme.name.concat(" (no bold style)");
  newTheme.tokenColors.forEach((tokenColor) => {
    if (
      tokenColor.settings.fontStyle === "bold" &&
      tokenColor.scope.every((scope) => !scope.includes("markup"))
    ) {
      delete tokenColor.settings.fontStyle;
    }
  });

  try {
    fs.writeFileSync(
      `./themes/calm-days-sober-nights-${newTheme.type}-no-bold-style.json`,
      prettier.format(JSON.stringify(newTheme), { parser: "json" })
    );
  } catch (err) {
    console.error(err);
  }
});
