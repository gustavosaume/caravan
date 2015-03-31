class TestimonialsController < ApplicationController
  before_action :set_shelter, only: [:create]

  # POST /shelters/:shelter_id/testimonial
  # POST /shelters/:shelter_id/testimonial.json
  def create
    puts "CREATE #{params}"
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
      params.require(:testimonial).permit(:comment, :author_name, :shelter_id, :shelter).merge(shelter: @shelter)
    end
end
