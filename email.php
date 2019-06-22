<?php
/**
 * Created by PhpStorm.
 * User: Akhil
 * Date: 19-06-2019
 * Time: 01:28 AM
 */

function sendEmail($from, $fromName, $to, $subject, $body, $replyTo = "")
{


    require("PHPMailer/class.phpmailer.php");

    $mail = new PHPMailer();

    $mail->IsSMTP();

    $mail->Mailer = "smtp";
    $mail->Host = "mail.avdevs.com";
    $mail->SMTPAuth = true;
    $mail->Username = "akhil@avdevs.com";
    $mail->Password = "avdevs@123";
    $mail->SMTPSecure = null;
    $mail->Port = 587;
    $mail->From = $from;
    $mail->FromName = $fromName;
    if($body){
        $body = $body;
    }else{
        $body = "test mail";
    }

    if (!empty($to) && is_array($to) && count($to) > 0) {
        foreach ($to as $emailId) {
            $mail->AddAddress($emailId, "");
        }
    } else {
        $mail->AddAddress($to, "");
    }
    if (trim($replyTo) != "") {
        $mail->AddReplyTo($replyTo, "");
    }


    $mail->WordWrap = 50;
    $mail->IsHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $body;

    if (!$mail->Send()) {
        return "Message could not be sent. Mailer Error: " . $mail->ErrorInfo;
    }
    return "Message has been sent";

}

?>