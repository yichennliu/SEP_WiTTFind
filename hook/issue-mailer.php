<?php
  $json = file_get_contents('php://input');
  $data = json_decode($json, true);

  if ($data["object_kind"] != "issue") {
    /* Spam attack?! */
    exit(1);
  }

  if ($data["object_attributes"]["action"] != "open") {
    /* Send mail only, when a new issue is opened */
    exit(1);
  }

  $to = "wast-list@lists.ifi.lmu.de";
  $subject = "[Issue] " . $data["object_attributes"]["title"];
  $subject = "=?utf-8?b?" . base64_encode($subject) ."?=";

  $headers = "From: WAST Issue Tracker <wast-bugs@cis.lmu.de>\r\n";
  $headers .= "Reply-To: wast-list@lists.ifi.lmu.de\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

  $message = "A new issue was assigned for a WAST component, see [1].\n\n";
  $message .= $data["object_attributes"]["description"];
  $message .= "\n\n";
  $message .= "[1] " . $data["object_attributes"]["url"];

  mail($to, $subject, $message, $headers);
?>
