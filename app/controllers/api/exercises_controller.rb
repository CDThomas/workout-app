class Api::ExercisesController < Api::BaseController
  def index
    # TODO: paginate
    exercises =
      if params[:query].present?
        Exercise.where('name ~* ?', params[:query]).limit(10)
      else
        Exercise.order(name: :asc).limit(10)
      end

    render json: exercises, each_serializer: ExerciseSerializer, status: 200
  end

  def create
    exercise = Exercise.new(exercise_params)
    if exercise.save
      render json: exercise, status: 201
    else
      render json: ErrorSerializer.serialize(exercise.errors), status: 422
    end
  end

  private
    def exercise_params
      params.require(:exercise).permit(:name, :main_muscle_worked_id)
    end
end
