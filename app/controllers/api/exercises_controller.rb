class Api::ExercisesController < ApplicationController
  def index
    exercises = Exercise.all
    render json: exercises, each_serializer: ExerciseSerializer
  end
end
