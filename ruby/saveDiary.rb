#!ruby
print "Content-type: text/html\n\n";

require 'cgi'
require 'sqlite3'

objCgi = CGI.new

_type = objCgi['type'].strip

_userName = objCgi['userName'].strip
_password = objCgi['password'].strip

db = SQLite3::Database.new("../db/sd.sqlite3")

if _type == 'delete' then
  _id = objCgi['id'].strip
  query = "DELETE FROM Diary WHERE id = #{_id};"
  db.execute(query)
  puts 'delete'
  exit
  
else
  if _type == 'update' then
    _id = objCgi['id'].strip
    
  end
  _title = objCgi['title'].strip
  _content = objCgi['content'].strip
  _registerDate = objCgi['registerDate'].strip
  _updateDate = objCgi['updateDate'].strip
  _imageName = objCgi['imageName'].strip
end

result = ''

query = "SELECT id FROM User WHERE name = '#{_userName}' AND password = '#{_password}';"

userId = db.execute(query)

if userId.length > 0 then
  
  if _type == 'update' then
    query = "UPDATE Diary SET title = '#{_title}', content = '#{_content}', updateDate = '#{_updateDate}', imageName = '#{_imageName}' WHERE id = #{_id};"
  elsif _type == 'add' then
    query = "INSERT INTO Diary( title, content, registerDate, updateDate, userId, imageName) VALUES( '#{_title}', '#{_content}', '#{_registerDate}', '#{_updateDate}', #{userId[0][0]}, '#{_imageName}');"
  end
  
  db.execute(query)

  result = 'true'
  
end

puts result
