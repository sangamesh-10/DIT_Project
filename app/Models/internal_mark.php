<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class internal_mark extends Model
{
    use HasFactory;
    protected $primaryKey=['roll_num','subject_code'];
    protected $keyType =[ 'string','string',];
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
        foreach((array)$this->getKeyName() as $keyName)
        {
            $query->where($keyName,"=",$this->getAttribute($keyName));
        }
        return $query;
    }
}
