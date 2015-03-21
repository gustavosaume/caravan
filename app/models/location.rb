class Location
  include Mongoid::Document

  field :street, type: String
  field :city,   type: String
  field :state,  type: String
  field :lonlat, type: Array



  # Relations
  #########################################################

  embedded_in :shelter




  # Methods
  #########################################################

  def latlon
    lonlat.nil? ? nil : lonlat.reverse
  end

  def to_hash
    {
      street: self.street,
      citi: self.city,
      state: self.state,
      latlon: self.latlon
    }
  end
end
