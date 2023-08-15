<?php

namespace App\Mail;

use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailSender extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $mailData;
    public $attachmentsReceived = null;
    public function __construct($mailData)
    {
        $this->mailData = $mailData;
        if(array_key_exists('attachments',$mailData)){

            $this->attachmentsReceived = $mailData['attachments'];
        }
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->mailData['subject'] ?? 'Default Subject',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $view = $this->mailData['view'];

        if ($view === 'emails.OtpEmail') {
            return new Content(
                view: $view,
            );
        } else if ($view === 'emails.Complaints') {
            return new Content(
                view: $view,
            );
        } else {
            throw new Exception('Invalid view');
        }
    }
    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        if (empty($this->attachmentsReceived)) {
            return [];
        }
        else{
            return $this->attachmentsReceived;
        }


    }
}
