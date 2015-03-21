class Shelter
  include Mongoid::Document

  field :name, type: String
  field :rating, type: Float
  field :description, type: String
  field :phone, type: String
  field :website, type: String
  field :max_beds, type: Integer
  field :need_to_know, type: String
  
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
    {
      description: self.description,
      id: self.id.to_s,
      location: self.location,
      name: self.name,
      rating: self.rating
    }
  end
end
