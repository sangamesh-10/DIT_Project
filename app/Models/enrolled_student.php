<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class enrolled_student extends Model
{
    use HasFactory;
    protected $primaryKey=['year','code'];
    protected $keyType =[ 'integer','string',];
    public $timestamps=false;
    public function getIncrementing()
    {
        return false;
    }
    public function getKeyName()
    {

        return $this->primaryKey;
    }
    protected function setKeysForSaveQuery($query)
    {
        foreach ((array)$this->getKeyName() as $keyName) {
            $query->where($keyName, '=', $this->getAttribute($keyName));
        }

        return $query;
    }
}
