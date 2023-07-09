<?php

namespace App\Models;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class admin_login extends Authenticatable implements JWTSubject
{
    use HasFactory,HasApiTokens;

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
    protected $primaryKey='admin_id';
    protected $keyType = 'string';
    public $timestamps=false;
    public function getIncrementing()
    {
        return false;
    }
    protected $fillable = [
        'admin_id',
        'password',
    ];
}
