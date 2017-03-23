class Api::ExercisesController < Api::BaseController
  def index
    # TODO: paginate
    exercises =
      if params[:query].present?
        # Exercise
          # .joins(:main_muscle_worked)
          # .where(
          #   'lower(exercises.name) LIKE :query OR lower(muscles.name) LIKE :query',
          #   query: "%#{params[:query].downcase}%"
          # )
          # .limit(10)
        Exercise.find_by_sql(['
          SELECT "exercises".* FROM exercises
          INNER JOIN muscles ON exercises.main_muscle_worked_id = muscles.id
          WHERE lower(exercises.name) LIKE :query OR lower(muscles.name) LIKE :query
          ORDER BY
            CASE
              WHEN lower(exercises.name) LIKE :query THEN 0
              ELSE 1
            END,
            exercises.name ASC
        ', { query: "%#{params[:query].downcase}%" }])
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
