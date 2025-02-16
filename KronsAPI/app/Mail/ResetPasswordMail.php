<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $resetLink;
    public $password;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($resetLink,$password)
    {
        $this->resetLink = $resetLink;
        $this->password = $password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
                    ->subject('Fiókja elkészült')
                    ->view('reset_password')
                    ->with([
                        'resetLink' => $this->resetLink,
                        'password' => $this->password,
                    ]);
    }
}
