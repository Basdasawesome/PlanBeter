<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class InviteMember extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    protected $group;
    protected $email;
    public function __construct($group, $email)
    {
        $this->group = $group;
        $this->email = $email;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Je bent uitgenodigt om deel te nemen aan een groep op Planbeter',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $encodedEmail = urlencode($this->email);

        return new Content(
            markdown: 'mail.invite-member',
            with: [
                'groupName' => $this->group['name'],
                'groupId' => $this->group['id'],
                'email' => $encodedEmail,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
