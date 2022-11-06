# Image Processing API

This project is a simple app for resizing images.

## dependencies

    - express
    - dotenv
    - image-size
    - sharp
    - jasmine
    - morgan
    - helmet

## scripts

To start on nodemon

```
npm run start
```

To start prettier format

```
npm run format
```

Test code by jasmine

```
npm run test
```

Test code by jasmine

```
npm run test
```

To use ESLint

```
npm run lint
```

To use ESLint and fix errors

```
npm run lint-fix
```

To build project

```
npm run build
```

To build project and run server

```
npm run start-prod
```

## How to use

Start server `npm run start-prod` default port is 3000.
Go to the following path

```
http://localhost:3000/api/images?filename=test.png&width=500&height=500
```

Whereas

    - ```test.png``` is a name of imgage.
    - ```width``` is new width.
    - ```height``` is new width.

## The names of the images on the server

    - test.png
    - 7vtz51f2.jpg
    - c27gp96q.webp
    - canmw2uq.jpg
    - cz2rvr5q.jpg
    - ltfnothg.jpg
    - pcen47p2.jpg
    - v4hr742x.webp
    - vuf1vcfd.jpg
    - zcemp4qt.jpg
