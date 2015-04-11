class Testimonial
  include Mongoid::Document
  include Mongoid::Timestamps::Created::Short

  field :author_name, type: String, default: "anonymous"
  field :rating, type: BigDecimal
  field :thumbnail, type: String, default: "/images/testimonials/placeholder.png"
  
  field :complaint, type: String
  field :compliment, type: String
  field :tips, type: String

  field :services, type: Array



  # Relations
  #########################################################

  belongs_to :shelter



  # Indexes
  #########################################################

  index c_at: 1



  # Functions
  #########################################################

  def to_hash
    shelter = Shelter.find(self.shelter_id)

    {
      id: self.id.to_s,
      author_name: self.author_name,
      created_at: self.c_at,
      thumbnail: thumbnail,
      
      complaint: self.complaint,
      compliment: self.compliment,
      tips: self.tips,

      comment: comment,

      shelter: {
        id: shelter.id.to_s,
        name: shelter.name
      }
    }
  end

  def comment
    comments = [self.compliment, self.complaint, self.tips]
    comments.compact!

    unless self.rating.nil? || self.rating == 0
      comments << "#{self.rating} stars"
    end

    comments.join("<br />")
  end
end
