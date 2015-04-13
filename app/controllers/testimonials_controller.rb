class TestimonialsController < ApplicationController
  before_action :set_shelter, only: [:create]

  # POST /shelters/:shelter_id/testimonial
  # POST /shelters/:shelter_id/testimonial.json
  def create
    testimonial = Testimonial.create(testimonial_params)
    render :json => testimonial.to_hash
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_shelter
      @shelter = Shelter.find(params[:shelter_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def testimonial_params
      params.require(:testimonial).permit(
        :author_name, 
        :shelter_id, 
        :complaint, 
        :compliment, 
        :tips, 
        :services, 
        :shelter, 
        :rating,
        :thumbnail
      )
      .merge(shelter: @shelter)
      .merge(thumbnail: random_thumbnail)
    end

    def random_thumbnail
      [
        "/images/avatars/Avatar0.png",
        "/images/avatars/Avatar1.png",
        "/images/avatars/Avatar2.png",
        "/images/avatars/Avatar3.png",
        "/images/avatars/Avatar4.png",
        "/images/avatars/Avatar5.png",
        "/images/avatars/Avatar6.png",
        "/images/avatars/Avatar7.png",
        "/images/avatars/Avatar8.png",
        "/images/avatars/Avatar9.png",
        "/images/avatars/Avatar10.png",
        "/images/avatars/Avatar11.png",
      ].sample
    end
end
