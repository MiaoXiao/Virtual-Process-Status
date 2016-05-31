<?php
$cmd="/usr/bin/perl ./grabline.pl";
exec('/usr/bin/perl ./grabline.pl 3', $result);
echo "result: ";
print_r($result);

?>
