const gulp = require("gulp");
const {
  execFile
} = require("child_process");
const cwebp = require("cwebp-bin");

execFile(cwebp, ['bin/res/exchange/item_101.png', '-o', 'item_101.webp'], err => {
  if (err) {
    throw err;
  }

  console.log('Image is converted!');
});