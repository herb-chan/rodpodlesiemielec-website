import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { folder } = req.query;
  const folderPath = path.join(
    process.cwd(),
    `public/images/gallery/${folder}`
  );

  if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
    return res.status(404).json({ error: 'Folder not found' });
  }

  const images = fs
    .readdirSync(folderPath)
    .filter((file) => /\.(jpg|jpeg|png|gif)$/.test(file));

  res
    .status(200)
    .json(
      images.map(
        (image) => `/images/gallery/${encodeURIComponent(folder)}/${image}`
      )
    );
}
