<?php

namespace App\Models;

class ModelStorage
{

    protected function filepath(string $filename)
    {
        return BASE_PATH . '/storage/' . $filename;
    }

    public function getJson(string $filename)
    {
        if (!file_exists($this->filepath($filename))) {
            return false;
        }
        return json_decode(file_get_contents($this->filepath($filename)));
    }

    public function setJson(string $filename, $data)
    {
        return file_put_contents($this->filepath($filename), json_encode($data));
    }

}
