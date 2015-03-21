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

  shelter = Shelter.new(
      name:         json_shelter[:name],
      rating:       json_shelter[:rating],
      description:  json_shelter[:description],
      phone:        json_shelter[:phone],
      website:      json_shelter[:website],
      max_beds:     json_shelter[:max_beds],
      need_to_know: json_shelter[:need_to_know]
    )


  json_location = json_shelter[:location]
  if json_location
    latlon = json_location[:coordinates]
    location = Location.new(
        street: json_location[:street],
        city:   json_location[:city],
        state:  json_location[:state],
        lonlat: latlon.nil? ? nil : latlon.reverse
      )  
    shelter.location = location
  end
  

  shelter.services = json_shelter[:services]
  shelter.filters = json_shelter[:filters]

  shelter.save
end

puts "#{shelters.count} shelters created."
puts ""

Shelter.all.each do |shelter|
  puts "#{shelter.name}: #{shelter.rating}  at #{shelter.location}"
  puts "  Testimonials:"
  (0..rand(10)).each do |i|
    testimonial = Testimonial.create(
      comment: Faker::Lorem.sentence(1),
      author_name: Faker::Name.name,
      shelter: shelter,
      c_at: Faker::Date.backward(rand(10))
    )
    testimonial.save!
    puts "    #{testimonial.comment}"

  end
end