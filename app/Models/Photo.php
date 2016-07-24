<?php

namespace App\Models;

class Photo extends ModelStorage
{

    public function getUnprocessed()
    {

        $config = (new Config())->get();

        $photos = [];
        foreach ((array)$this->getJson('photos.json') as $photo) {
            $photo->filepath = BASE_PATH . '/' . $config->directories->unprocessed . '/' . $photo->filename;
            if (!file_exists($photo->filepath)) {
                continue;
            }
            $photos[] = $photo;
        }
        return $photos;

    }

    public function get()
    {
        return $this->getJson('processed-photos.json');
    }

    public function set(array $photos)
    {
        return $this->setJson('processed-photos.json', $photos);
    }

}
