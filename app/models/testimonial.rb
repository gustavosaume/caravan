class Testimonial
  include Mongoid::Document
  include Mongoid::Timestamps::Created::Short

  field :comment
  field :author_name

  belongs_to :shelter


  index c_at: -1

  def to_hash
    shelter = Shelter.find(self.shelter_id)

    {
      id: self.id.to_s,
      comment: self.comment,
      author_name: self.author_name,
      created_at: self.c_at,
      shelter: {
        id: shelter.id.to_s,
        name: shelter.name
      }
    }
  end
end
