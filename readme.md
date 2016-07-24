# [Photos][photos]

I like taking photos, most of the time I upload photos to Facebook; however I dislike the image compression Facebook use for photos. So I decided to build a basic gallery for some of my better photos.

I didn't want to build a heavy database driven gallery so I decided to build it (like my [personal website][joelvardy]) with static data files stored in version control.

## Development

 * Config options are found at `/storage/config.json`
 * Run `composer install`
 * Run `npm install`
 * Run `bower install`
 * Generate assets `gulp --production`

 ### Server

 Run a local Homestead virtual machine, with the following:

```
# First use
php vendor/bin/homestead make
vim Homestead.yaml
echo 192.168.10.12 photos.joelvardy.dev | sudo tee -a /etc/hosts

# Homestead virtual machine
vagrant up
```

### Adding Photos

Add a new photo to the `/photos` directory and update the `/storage/photos.json` file.

Then run:
```
./run process:photos
```

## Notes

### Binary Data and Git

I know storing large binary data in git is not the most appropriate solution, it would be quite easy to have the processing script download images from a Dropbox folder, but for now this serves it's purpose.

[Joel Vardy][joelvardy]

  [photos]: https://photos.joelvardy.com/
  [joelvardy]: https://joelvardy.com/
