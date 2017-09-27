#!ruby
print "Content-type: text/html\n\n";

require 'cgi'
require 'sqlite3'

result = ''

objCgi = CGI.new

_name = objCgi['name'].strip
_oldPassword = objCgi['oldPassword'].strip
_newPassword = objCgi['newPassword'].strip

print result
