<?php
$cmd="/usr/bin/perl ./grabline.pl";
exec('/usr/bin/perl ./grabline.pl', $result);
echo "result: ";
print_r($result);

?>
