# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'yaml'

Mongoid.purge!

shelters = YAML.load_file('db/data/shelters.yaml')
shelters.each do |json_shelter|
  json_shelter.symbolize_keys!
  shelter = Shelter.create(
    name:        json_shelter[:name],
    description: json_shelter[:description],
    rating:      json_shelter[:rating],
    location:    json_shelter[:location])
  shelter.save
end

Shelter.all.each do |shelter|
  puts "#{shelter.name}: #{shelter.rating}  at #{shelter.location}"
end