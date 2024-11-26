import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const imagesDir = path.join(process.cwd(), 'public/images/gallery');
  const folders = fs
    .readdirSync(imagesDir)
    .filter((folder) =>
      fs.statSync(path.join(imagesDir, folder)).isDirectory()
    );

  // Create an array of folder names with their first image and folder data
  const foldersWithThumbnails = folders.map((folder) => {
    const folderPath = path.join(imagesDir, folder);
    const images = fs
      .readdirSync(folderPath)
      .filter((file) => /\.(jpg|jpeg|png|gif)$/.test(file));
    const thumbnail =
      images.length > 0
        ? `/images/gallery/${encodeURIComponent(folder)}/${images[0]}`
        : null;

    // Load folder metadata from data.json if it exists
    const metadataPath = path.join(folderPath, 'folder_data.json');
    let folderData = null;
    if (fs.existsSync(metadataPath)) {
      folderData = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
    }

    return { folder, thumbnail, folderData };
  });

  res.status(200).json(foldersWithThumbnails);
}
