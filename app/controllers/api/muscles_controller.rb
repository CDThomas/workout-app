class Api::MusclesController < Api::BaseController
  def index
    muscles = Muscle.all.order(name: :asc)
    render json: muscles, each_serializer: MuscleSerializer, status: 200
  end
end
