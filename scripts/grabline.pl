#!/usr/bin/perl 

$info =`ps aux`;
@lines=split('\n', $info);
$line=$ARGV[0];

if($line eq "")
{
  foreach $var(@lines)
  {
    @notime=split(" ", $var);
    if(!($notime[2] eq "0.0"))
    {
      print "$var\n";
    }
  }
}
else
{
  #print "$lines[$line]\n";
  @notime=split(" ", $lines[$line]);
  if(!($notime[2] eq "0.0"))
  {
     print $lines[$line];
  }
}
