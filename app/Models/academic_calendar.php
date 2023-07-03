<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class academic_calendar extends Model
{
    use HasFactory;
    public $table = 'academic_calendar';
    protected $primaryKey = ['branch', 'semester', 'description'];
    protected $keyType = ['string', 'integer', 'string'];

    public $timestamps = false;
    public function getIncrementing()
    {
        return false;
    }
    protected $fillable=['from_date','to_date'];
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
