const path = require("path");
const fs = require("fs");
const darkTheme = require("./themes/calm-days-sober-nights-dark.json");
const lightTheme = require("./themes/calm-days-sober-nights-light.json");

const directoryPath = path.join(__dirname, "themes", "icons");

fs.readdir(directoryPath, function (_err, files) {
  files.forEach(function (file) {
    if (file.endsWith(".svg")) {
      const filePath = path.join(directoryPath, file);
      const data = fs.readFileSync(filePath, "utf-8");
      let newValue;

      newValue = data
        .replace(
          /fill="#[a-z0-9]{6}"/gim,
          `fill="${
            file.endsWith("_dark.svg")
              ? darkTheme.colors.foreground
              : lightTheme.colors.foreground
          }"`
        )
        .replace(
          /(fill-opacity="[0-9]\.[0-9]+"){1}/im,
          `fill-opacity="0.${file.endsWith("_dark.svg") ? "4" : "5"}6"`
        )
        .replace(
          /(Path-3-Copy.+)(fill-opacity="[0-9]\.[0-9]+")/gim,
          `$1fill-opacity="0.${file.endsWith("_dark.svg") ? "08" : "12"}"`
        );

      fs.writeFileSync(filePath, newValue, "utf-8");
    }
  });
});
