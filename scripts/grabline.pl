#!/usr/bin/perl 

$info =`ps aux`;
@lines=split('\n', $info);
$line=$ARGV[0];

if($line eq "")
{
  foreach $var(@lines)
  {
    print "$var\n";
  }
}
else
{
  print "$lines[$line]\n";
}
