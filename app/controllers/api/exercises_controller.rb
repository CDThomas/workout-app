class Api::ExercisesController < ApplicationController
  def index
    # TODO: paginate
    exercises =
      if params[:query].present?
        Exercise.where('name ~* ?', params[:query]).limit(10)
      else
        Exercise.order(name: :asc).limit(10)
      end

    render json: exercises, each_serializer: ExerciseSerializer
  end
end
