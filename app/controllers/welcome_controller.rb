class WelcomeController < ApplicationController
  def index
    @testimonials = Testimonial.all.sort(c_at: -1).limit(5).map(&:to_hash)
  end
end
