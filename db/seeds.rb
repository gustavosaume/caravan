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
      need_to_know: json_shelter[:need_to_know],
      thumbnail:    json_shelter[:thumbnail]
    )


  json_location = json_shelter[:location]

  if json_location
    json_location.symbolize_keys!
  
    latlon = json_location[:coordinates]
    location = Location.new(
        street:     json_location[:street],
        city:       json_location[:city],
        state:      json_location[:state],
        lonlat: latlon.nil? ? nil : latlon.reverse
      )
    location[:street_ref] = json_location[:street_ref] unless json_location[:street_ref].nil? 
    location[:public_transit] = json_location[:public_transit] unless json_location[:public_transit].nil? 
    shelter.location = location
  end
  

  shelter.services = json_shelter[:services]
  shelter.filters = json_shelter[:filters]

  shelter.save
end

puts "#{shelters.count} shelters created."
puts ""

# Shelter.all.each do |shelter|
#   puts "#{shelter.name}: #{shelter.rating}  at #{shelter.location}"
#   puts "  Testimonials:"
#   (0..rand(10)).each do |i|
#     testimonial = Testimonial.create(
#       comment: Faker::Lorem.sentence(1),
#       author_name: Faker::Name.name,
#       shelter: shelter,
#       c_at: Faker::Date.backward(rand(10))
#     )
#     testimonial.save!
#     puts "    #{testimonial.comment}"

#   end
# end

Shelter.find_by(name: "Ali Forney Center (Harlem Drop-in Center)") do |s|
  testimonial = Testimonial.create(
      compliment: "Its a great environment. The staff’s LGBT, everybody understands where you’re coming from, some have had their own struggles & periods of homelessness, so its a great way to relate to people, see where they are to see where you can actually go, if not further.",
      tips: "It's strictly LGBT youth",
      author_name: "GEORGE",
      shelter: s,
      thumbnail: "/images/testimonials/george.jpg"
    )
    testimonial.save! 
end

Shelter.find_by(name: "The Door") do |s|
  testimonial = Testimonial.create(
      compliment: "They do a lot of great things. They have after school programs if you just want to get away for a bit they have computer classes, movies, medical attention, trans care and more.",
      author_name: "RANASME",
      shelter: s,
      thumbnail: "/images/testimonials/ranasme.jpg"
    )
    testimonial.save! 
end

Shelter.find_by(name: "The Covenant House") do |s|
  testimonial = Testimonial.create(
      compliment: "Being Gay does not influence where I stay. The Covenant House has great resources and job training.",
      tips: "Think positively and work hard, that's what matters.",
      author_name: "JOSEPH",
      shelter: s,
      thumbnail: "/images/testimonials/joseph.jpg"
    )
    testimonial.save! 
end
