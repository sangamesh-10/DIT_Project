<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Validator;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Blade::component('header', 'x-header');
        Blade::component('footer', 'x-footer');
        Validator::extend('custom_subject_code', function ($attribute, $value, $parameters, $validator) {
            $validPrefixes5Chars = ['MC'];
            $validPrefixes6Chars = ['SE', 'DS', 'CS', 'CN'];

            if (strlen($value) === 5) {
                return in_array(substr($value, 0, 2), $validPrefixes5Chars)
                    && is_numeric(substr($value, 2, 1))
                    && in_array(substr($value, 3, 1), ['1', '2', '3', '4'])
                    && is_numeric(substr($value, 4, 1));
            } elseif (strlen($value) === 6) {
                return in_array(substr($value, 0, 2), $validPrefixes6Chars)
                    && is_numeric(substr($value, 2, 1))
                    && in_array(substr($value, 3, 1), ['e', 'c'])
                    && is_numeric(substr($value, 4, 1))
                    && is_numeric(substr($value, 5, 1));
            }

            return false;
        });

        Validator::replacer('custom_subject_code', function ($message, $attribute, $rule, $parameters) {
            return 'The subject code is not valid.';
        });
    }
}
