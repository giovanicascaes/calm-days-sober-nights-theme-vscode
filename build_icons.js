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
          .replace(/="#DBCCDA"/gim, `="${darkTheme.colors["icon.foreground"]}"`)
          .replace(/="#F1F0F8"/gim, '="#F1F0F8"')
          .replace(/-opacity="0.46"/gim, '-opacity="0.46"')
          .replace(/-opacity="0.18"/gim, '-opacity="0.18"');
      } else {
        newValue = data
          .replace(
            /="#827481"/gim,
            `="${lightTheme.colors["icon.foreground"]}"`
          )
          .replace(/="#060218"/gim, '="#060218"')
          .replace(/-opacity="0.56"/gim, '-opacity="0.56"')
          .replace(/-opacity="0.20"/gim, '-opacity="0.18"');
      }

      fs.writeFileSync(filePath, newValue, "utf-8");
    }
  });
});
