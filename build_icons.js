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

      if (file.endsWith("_dark.svg")) {
        newValue = data
          .replace(
            /fill="#[a-z0-9]{6}"/gim,
            `fill="${darkTheme.colors.foreground}"`
          )
          .replace(/(fill-opacity="[0-9]\.[0-9]+"){1}/im, 'fill-opacity="0.46"');
      } else {
        newValue = data
          .replace(
            /fill="#[a-z0-9]{6}"/gim,
            `fill="${lightTheme.colors.foreground}"`
          )
          .replace(/(fill-opacity="[0-9]\.[0-9]+"){1}/im, 'fill-opacity="0.56"');
      }

      fs.writeFileSync(filePath, newValue, "utf-8");
    }
  });
});
