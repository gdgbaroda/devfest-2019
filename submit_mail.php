<?php
/**
 * Created by PhpStorm.
 * User: GDG Baroda
 * Date: 20-06-2019
 * Time: 01:18 PM
 */
include("email.php");

if(isset($_POST["flag_from"]) && $_POST["flag_from"] == "contact"){
    echo sendEmail(
        $_POST["email"],
        'GDGDevFest2019',
        "akhilkharva@gmail.com",
        "GDG : Question from ".$_POST["name"],
        $body = "Name : ".$_POST["name"]."<br> Question : ".$_POST["question"].'<br> Phone : '.$_POST["phone"].'<br> Email : '.$_POST["email"],
        $_POST["email"]
    );
}

if(isset($_POST["flag_from"]) && $_POST["flag_from"] == "inquiry") {
    echo sendEmail(
        $_POST["email"],
        'GDGDevFest2019',
        "gdgbaroda@gmail.com",
        "Business Inquiry from " . $_POST["name"],
        '',
        $_POST["email"]
    );
}
if(isset($_POST['flag_from']) && ($_POST["flag_from"] == "subscribe")){
    echo sendEmail(
        $_POST["email"],
        'GDGDevFest2019',
        "gdgbaroda@gmail.com",
        "Subscribe me",
        "Subscribe for updates on GDGDevFest 2019: ".$_POST["email"],
        $_POST["email"]
    );
}