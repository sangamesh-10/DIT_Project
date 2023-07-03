<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class assign_faculty extends Model
{
    use HasFactory;
    public $table='assign_faculty';
    protected $primaryKey=['faculty_id','subject_code'];
    protected $keyType =[ 'string','string'];
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
