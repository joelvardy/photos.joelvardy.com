<?php

namespace App\Models;

class Config extends ModelStorage
{

    public function get()
    {
        return $this->getJson('config.json');
    }

    public function set($config)
    {
        return $this->setJson('config.json', $config);
    }

}
