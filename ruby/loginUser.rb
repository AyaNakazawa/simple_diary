#!ruby
print "Content-type: text/html\n\n";

require 'cgi'
require 'sqlite3'

objCgi = CGI.new
_id = objCgi["id"]
_password = objCgi["password"]

query = "SELECT name FROM User WHERE name = '#{_id}' AND password = '#{_password}';"

db = SQLite3::Database.new("../db/sd.sqlite3")

result = db.execute(query)

puts result
