class Location
  include Mongoid::Document

  field :street,         type: String
  field :street_ref,     type: String
  field :city,           type: String
  field :state,          type: String
  field :public_transit, type: String
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
    hash = {
      street: self.street,
      city: self.city,
      state: self.state,
      latlon: self.latlon
    }

    hash[:street_ref] = self.street_ref unless self.street_ref.nil?
    hash[:public_transit] = self.public_transit unless self.public_transit.nil?

    hash
  end
end
