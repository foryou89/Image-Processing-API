import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import fs from 'fs';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import RsizeImage from './classes/resize';
import handleErrors from './functions/handle_errors';
import getHtmlPage from './functions/get_html_page';

//- .env config file
dotenv.config();
const PORT: number = parseInt(process.env.PORT as string) || 3000;
const outImgDir: string = (process.env.OUT_IMG as string) || 'resized-images';

//- create an instance server
const MyApp: Application = express();

//- HTTP request logger middleware by morgan
MyApp.use(morgan('dev'));

//- HTTP request logger middleware by helmet
MyApp.use(helmet());

//- path for home page
MyApp.get(
  '/',
  async (
    req: Request,
    res: Response
  ): Promise<express.Response<string, Record<string, string>>> => {
    return res.status(200).send(getHtmlPage('index'));
  }
);

//- path for api
MyApp.get(
  '/api/images',
  async (
    req: Request,
    res: Response
  ): Promise<express.Response<string, Record<string, string>> | undefined> => {
    if (!req.query.filename) {
      return res
        .status(400)
        .send(
          getHtmlPage(
            'error',
            'Request api is not valid, It must contain the name of the image.'
          )
        );
    }
    if (!req.query.width) {
      return res
        .status(400)
        .send(
          getHtmlPage(
            'error',
            'Request api is not valid, It must contain the width of the new image.'
          )
        );
    }
    if (!req.query.height) {
      return res
        .status(400)
        .send(
          getHtmlPage(
            'error',
            'Request api is not valid, It must contain the height of the new image.'
          )
        );
    }
    if (req.query.filename == '') {
      return res
        .status(400)
        .send(getHtmlPage('error', 'Image name cannot be empty.'));
    }
    if (!/^\d+$/.test(req.query.width as string)) {
      return res
        .status(400)
        .send(
          getHtmlPage('error', 'The width of the new image must be a number.')
        );
    }

    if (!/^\d+$/.test(req.query.height as string)) {
      return res
        .status(400)
        .send(
          getHtmlPage('error', 'The height of the new image must be a number.')
        );
    }
    if (parseInt(req.query.width as string) <= 0) {
      return res
        .status(400)
        .send(
          getHtmlPage('error', 'New image width cannot be less than 1 pixel.')
        );
    }
    if (parseInt(req.query.height as string) <= 0) {
      return res
        .status(400)
        .send(
          getHtmlPage('error', 'New image height cannot be less than 1 pixel.')
        );
    }

    const filename: string = req.query.filename as string;
    const new_width: number = parseInt(req.query.width as string);
    const new_height: number = parseInt(req.query.height as string);

    //- create an instance RsizeImage
    const ri = new RsizeImage(filename);

    //- check if file exists -> return -> true | false
    if (!ri.check_if_file_exists()) {
      return res
        .status(400)
        .send(getHtmlPage('error', 'The file name does not exist.'));
    }

    //- check if valid image -> return -> true | false
    if (!ri.check_if_valid_image()) {
      return res
        .status(400)
        .send(getHtmlPage('error', 'This image is invalid or unsupported.'));
    }

    //- start resize image -> return -> new file name as string
    const output = await ri.resize(new_width, new_height);
    if (output == '') {
      return res
        .status(400)
        .send(
          getHtmlPage(
            'error',
            'An error occurred while resizing the image, Try again.'
          )
        );
    } else {
      //- load resized image
      fs.readFile(
        __dirname + '/assets/' + outImgDir + '/' + output,
        function (
          err: NodeJS.ErrnoException | null,
          content: Buffer
        ): express.Response<string, Record<string, string>> {
          if (err) {
            return res
              .status(400)
              .send(
                getHtmlPage(
                  'error',
                  'An error occurred while resizing the image, Try again.'
                )
              );
          }
          const ext = output.split('.')[1];
          res.setHeader('Content-Type', 'image/' + ext);
          return res.status(200).send(content);
        }
      );
    }
  }
);

//- error if other path
MyApp.use(
  (
    _req: Request,
    res: Response
  ): express.Response<string, Record<string, string>> => {
    return res
      .status(404)
      .send(getHtmlPage('error', 'This page does not exist.'));
  }
);

MyApp.use(handleErrors);

//- start server
MyApp.listen(PORT, (): void => {
  console.info('Server is starting now at port:' + PORT);
});
export default MyApp;
