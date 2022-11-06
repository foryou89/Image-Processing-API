import fs from 'fs';
import MyImage from '../interfaces/my-image';
import * as path from 'path';
import * as dotenv from 'dotenv';
import dimensions from 'image-size';
import sharp from 'sharp';

//- list of allowed image extension
const allowedExtension: Array<string> = ['jpg', 'png', 'webp', 'gif'];

class RsizeImage {
  private image_name: string;
  private image_path: string;

  constructor(image_name: string) {
    dotenv.config();
    this.image_name = image_name;
    const srcImgDir: string =
      (process.env.SRC_IMG as string) || 'resized-images';
    this.image_path = path.join(
      __dirname,
      '/../assets/' + srcImgDir + '/' + image_name
    );
  }

  //- check if image exists in src folder
  check_if_file_exists(): boolean {
    if (fs.existsSync(this.image_path)) {
      return true;
    }
    return false;
  }

  //- check if image is valid image
  check_if_valid_image(): boolean {
    try {
      const img: MyImage = dimensions(this.image_path) as MyImage;
      if (
        allowedExtension.includes(img.type) &&
        img.width > 0 &&
        img.height > 0
      ) {
        return true;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
    return false;
  }

  //- resize image by sharp
  //- if output is exists it will return this output (caching)
  async resize(new_width: number, new_height: number): Promise<string> {
    let output = '';
    const outImgDir: string =
      (process.env.OUT_IMG as string) || 'resized-images';
    const filename = this.image_name.split('.')[0];
    const ext = this.image_name.split('.')[1];
    const new_filename = filename + '_w' + new_width + '_h' + new_height;
    const newfile_path = path.join(
      __dirname,
      '/../assets/' + outImgDir + '/' + new_filename + '.' + ext
    );
    if (fs.existsSync(newfile_path)) {
      return new_filename + '.' + ext;
    }
    try {
      await sharp(this.image_path)
        .resize({
          fit: sharp.fit.fill,
          width: new_width,
          height: new_height,
        })
        .toFile(newfile_path);
      output = new_filename + '.' + ext;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
    return output;
  }
}

export default RsizeImage;
