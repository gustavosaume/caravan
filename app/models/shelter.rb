class Shelter
  include Mongoid::Document

  field :name, type: String
  field :rating, type: Float
  field :description, type: String
  field :phone, type: String
  field :website, type: String
  field :max_beds, type: Integer
  field :need_to_know, type: String
  field :thumbnail, type: String
  
  field :services, type: Array
  field :filters, type: Array

  

  # Relations
  #########################################################

  embeds_one :location
  has_many :testimonials
  


  # Indexes
  #########################################################

  index({ 'location.lonlat' => '2d' },
        { min: -180, max: 180, background: true })



  # Functions
  #########################################################

  def to_hash
    hash = {
      id: self.id.to_s,
      name: self.name,
      rating: self.rating,
      description: self.description,
      phone: self.phone,
      website: self.website,
      max_beds: self.max_beds,
      need_to_know: self.need_to_know,
      location: self.location.nil? ? nil : self.location.to_hash,
      thumbnail: self.thumbnail,
      
      services: self.services,
      filters: self.filters,
    }

    hash[:latest_testimonial] = self.sorted_testimonials.first.to_hash unless self.testimonials.nil? || self.testimonials.length == 0
    hash
  end

  def sorted_testimonials
    self.testimonials.reverse
  end
end
