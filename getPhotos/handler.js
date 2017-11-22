'use strict';

module.exports.getPhotos = (event, context, callback) => {

    const API500px = require('500px');
    let api500px = new API500px(process.env.API_CONSUMER_KEY);

    api500px.photos.getByUsername('joelvardy', {
        sort: 'created_at',
        sort_direction: 'desc',
        rpp: 100,
        image_size: '600,2048',
    }, (error, results) => {

        if (error) {
            return callback(error);
        }

        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(results.photos.map((photo) => {
                return {
                    name: photo.name,
                    description: photo.description,
                    url: photo.url,
                    camera: {
                        name: photo.camera,
                        lens: photo.lens,
                        focalLength: photo.focal_length,
                        iso: photo.iso,
                        shutterSpeed: photo.shutter_speed,
                        aperture: photo.aperture,
                        latitude: photo.latitude,
                        longitude: photo.longitude,
                        taken: photo.taken_at,
                    },
                    created: photo.created_at,
                    width: photo.width,
                    height: photo.height,
                    images: photo.images.map((image) => {
                        return {
                            size: image.size,
                            url: image.url,
                        };
                    }),
                };
            })),
        });

    });

};
