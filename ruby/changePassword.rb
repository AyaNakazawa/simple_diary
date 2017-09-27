#!ruby
print "Content-type: text/html\n\n";

require 'cgi'
require 'sqlite3'

result = ''

objCgi = CGI.new

_name = objCgi['name'].strip
_oldPassword = objCgi['oldPassword'].strip
_newPassword = objCgi['newPassword'].strip

db = SQLite3::Database.new("../db/sd.sqlite3")

query = "SELECT id FROM User WHERE name = '#{_name}' AND password = '#{_oldPassword}';"

userId = db.execute(query)

print result
