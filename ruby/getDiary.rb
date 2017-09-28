#!ruby
print "Content-type: text/html\n\n";

require 'cgi'
require 'sqlite3'
require 'json'

objCgi = CGI.new

_id = objCgi['id'].strip
_password = objCgi['password'].strip

result = {}

db = SQLite3::Database.new("../db/sd.sqlite3")

query = "SELECT id FROM User WHERE name = '#{_id}' AND password = '#{_password}';"

userId = db.execute(query)

if userId.length > 0 then
  query = "SELECT * FROM Diary WHERE userId = #{userId[0][0]} ORDER BY updateDate desc;"
  
  order = 1
  db.results_as_hash = true
  db.execute(query) do |row|
    result[order] = row
    order += 1
  end
  
  puts result.to_json
  
else
  puts '{}'
  
end
