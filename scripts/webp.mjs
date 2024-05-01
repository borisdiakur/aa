import sharp from 'sharp'
import { writeFile, readdir } from 'fs/promises'
import { join } from 'path'

const directoryPath = 'public/images'

const convertToWebP = async (filePath) => {
  try {
    const data = await sharp(filePath)
      .webp({ quality: 90 })
      .toBuffer()
    await writeFile(filePath.replace(/\.\w+$/, '.webp'), data)
    console.log(`Converted ${filePath} to WebP`)
  } catch (error) {
    console.error('Error processing file', filePath, error)
  }
}

const files = await readdir(directoryPath)

files.forEach(file => {
  const filePath = join(directoryPath, file)
  if (/\.(jpe?g|png)$/i.test(file)) {
    convertToWebP(filePath)
  }
})