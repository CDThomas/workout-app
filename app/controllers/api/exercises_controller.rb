class Api::ExercisesController < Api::BaseController
  def index
    # TODO: paginate
    exercises =
      if params[:query].present?
        # TODO: refactor into query object
        # NOTE: using ORDER BY but not LIMIT so that I can paginate later

        # This returns exercises that:
        # - have the query in the exercise name
        # - have the query in the muscle name
        # Ordering (from first to last):
        # - Records with the query at the beginning of the exercise name
        # - Records with the query anywhere in the exercise name
        # - Records with the query anywere in the muscle name
        # - These groups are sub-ordered by the exercise name (case insensitive)
        #   - Case insensitive because of possible weird names like RDL
        #   - might change this behavior later and just lowercase all names before saving to the DB
        # - I considered using muscle name in ordering, but decided not to because if I want exercies
        #   for a specific muscle, I can type of the full muscle name (in the case of lower back,
        #   middle back, etc)
        sql_query = <<~SQL
          SELECT "exercises".* FROM exercises
            INNER JOIN muscles ON exercises.main_muscle_worked_id = muscles.id
            WHERE lower(exercises.name) LIKE :query_in_any_position
              OR lower(muscles.name) LIKE :query_in_any_position
            ORDER BY
              CASE
                WHEN lower(exercises.name) LIKE :query_at_beginning THEN 0
                WHEN lower(exercises.name) LIKE :query_in_any_position THEN 1
                ELSE 2
              END,
              lower(exercises.name) ASC
        SQL

        Exercise.find_by_sql([
          sql_query,
          {
            query_in_any_position: "%#{params[:query].downcase}%",
            query_at_beginning: "#{params[:query].downcase}%"
          }
        ])
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
