class Api::RoutinesController < Api::BaseController
  def index
    routines =
      if params[:query].present?
        Routine.where('lower(name) LIKE ?', "%#{params[:query].downcase}%")
      else
        Routine.all.order(name: :asc).limit(10)
      end

    render json: routines, each_serializer: RoutineSerializer, status: 200
  end

  def create
    routine = Routine.new(routine_params)
    if routine.save
      render json: routine, status: 201
    else
      render json: ErrorSerializer.serialize(routine.errors), status: 422
    end
  end

  private
    def routine_params
      params.require(:routine).permit(:name, faf_sets_attributes: [:exercise_id])
    end
end
