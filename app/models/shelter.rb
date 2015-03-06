class Shelter
  include Mongoid::Document

  field :name, type: String
  field :description, type: String
  field :rating, type: Float
  field :location, type: Array

  has_many :testimonials
  

  index({ location: "2d"}, { min: -200, max: 200 })

  def to_hash
    {
      description: self.description,
      id: self.id.to_s,
      location: self.location,
      name: self.name,
      rating: self.rating
    }
  end
end
