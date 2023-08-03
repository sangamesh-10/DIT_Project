<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class daily_attendance extends Model
{
    use HasFactory;
    public $table='daily_attendance';
    protected $primaryKey=['roll_num','subject_code','date'];
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
