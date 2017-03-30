class Api::RoutinesController < Api::BaseController
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
