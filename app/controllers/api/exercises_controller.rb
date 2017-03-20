class Api::ExercisesController < ApplicationController
  def index
    # TODO: paginate
    # TODO: support query param (search on name or main_muscle_targeted)
    exercises = Exercise.all
    render json: exercises, each_serializer: ExerciseSerializer
  end
end
