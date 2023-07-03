<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class noticeboard extends Model
{
    use HasFactory;
    public $table="noticeboard";
    protected $primaryKey=['notice_id','description','date'];
    protected $keyType =[ 'string','string','date'];
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
