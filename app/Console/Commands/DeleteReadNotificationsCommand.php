<?php

namespace App\Console\Commands;

use App\Models\notifications;
use Carbon\Carbon;
use Illuminate\Console\Command;

class DeleteReadNotificationsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notifications:delete-read';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete read notifications older than a specific time';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $olderThanDays = 7; // Delete notifications older than 7 days
        $timestamp = Carbon::now()->subDays($olderThanDays);

        notifications::where('is_read', true)
            ->where('created_at', '<', $timestamp)
            ->delete();

        $this->info('Read notifications deleted successfully.');
    }
}
