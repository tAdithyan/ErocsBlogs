
import fs from 'fs';
import path from 'path';

export const deleteImageFromUploads = (filename) => {
    const value = filename?.split('/').pop();

    console.log(filename)
    if (!filename) return;
    const filePath = path.join('uploads', value);
    console.log(filePath)

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete image:", err);
      } else {
        console.log("Image deleted:", value);
      }
    });
  };
  