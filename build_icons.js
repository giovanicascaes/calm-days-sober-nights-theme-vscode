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
          .replace(
            /="#C7CADB"/gim,
            `="${darkTheme.colors["icon.foreground"]}"`
          )
          .replace(
            /="#ECEEF8"/gim,
            `="${darkTheme.colors["descriptionForeground"]}"`
          )
          .replace(/-opacity="0.54"/gim, '-opacity="0.36"')
          .replace(/-opacity="0.26"/gim, '-opacity="0.36"');
      } else {
        newValue = data
          .replace(
            /="#6F7B87"/gim,
            `="${lightTheme.colors["icon.foreground"]}"`
          )
          .replace(
            /="#000018"/gim,
            `="${lightTheme.colors["descriptionForeground"]}"`
          )
          .replace(/-opacity="0.62"/gim, '-opacity="0.44"')
          .replace(/-opacity="0.24"/gim, '-opacity="0.44"');
      }

      fs.writeFileSync(filePath, newValue, "utf-8");
    }
  });
});
