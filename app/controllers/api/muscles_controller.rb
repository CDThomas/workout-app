class Api::MusclesController < ApplicationController
  def index
    muscles = Muscle.all.order(name: :asc)
    render json: muscles, each_serializer: MuscleSerializer
  end
end
