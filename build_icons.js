const path = require("path");
const fs = require("fs");
const darkTheme = require("./themes/calm-days-sober-nights-dark.json");
const lightTheme = require("./themes/calm-days-sober-nights-light.json");

const directoryPath = path.join(__dirname, "themes", "icons");

fs.readdir(directoryPath, function (_err, files) {
  files.forEach(function (file) {
    if (file.endsWith(".svg")) {
      const isDark = file.endsWith("_dark.svg");
      const filePath = path.join(directoryPath, file);
      const data = fs.readFileSync(filePath, "utf-8");
      let newValue;

      if (isDark) {
        newValue = data
          .replace(/="#C7CADB"/gim, `="${darkTheme.colors["icon.foreground"]}"`)
          .replace(
            /="#6D7185"/gim,
            `="${darkTheme.colors["descriptionForeground"]}"`
          )
          .replace(/-opacity="0.36"/gim, '-opacity="0.36"')
          .replace(/-opacity="0.32"/gim, '-opacity="0.32"');
      } else {
        newValue = data
          .replace(
            /="#6F7B87"/gim,
            `="${lightTheme.colors["icon.foreground"]}"`
          )
          .replace(
            /="#99A9B8"/gim,
            `="${lightTheme.colors["descriptionForeground"]}"`
          )
          .replace(/-opacity="0.44"/gim, '-opacity="0.44"')
          .replace(/-opacity="0.34"/gim, '-opacity="0.34"');
      }

      fs.writeFileSync(filePath, newValue, "utf-8");
    }
  });
});
