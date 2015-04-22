# [Photos][photos]

I like taking photos, most of the time I upload photos to Facebook; however I dislike the image compression Facebook use for photos. So I decided to build a basic gallery for some of my better photos.

I didn't want to build a heavy database driven gallery so I decided to build it (like my [personal website][joelvardy]) with static data files stored in version control.

## Configuration

There are some configurable options in the `/app/config/photos.php` file which allow me to define image size, and quality.

## Adding Photos

Add a new photo to the `/photos` directory and update the `/photos/_data.json` file.

The only required field is the `filename` - other fields are passed to the view, so you can for example add a description to each photo.

## Processing Photos

Before the photos are displayed, you must run the processing script.

```
php process
```

**Note::** The processed directory (specified in the photos config file) must be writable by the php script.

## Development

The project uses Composer, NPM, and Bower for package management, to install packages run:

```
composer install
npm install
bower install
```

### SASS and JavaScript

To minify JavaScript and compile SASS run:

```
gulp

# Or to watch for changes
gulp watch
```

### Development Server

You can use the built in PHP server for previewing changes on a local development machine, to do this run the followung command:

```
php -S 127.0.0.1:1337 -t public public/index.php
```

## Notes

### Binary Data and Git

I know storing large binary data in git is not the most appropriate solution, it would be quite easy to have the processing script download images from a Dropbox folder, but for now this serves it's purpose.

[Joel Vardy][joelvardy]

  [photos]: https://photos.joelvardy.com/
  [joelvardy]: https://joelvardy.com/
