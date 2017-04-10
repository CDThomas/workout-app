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

  def show
    routine = Routine.find(params[:id])
    render json: routine, status: 200
  end

  def create
    routine = Routine.new()
    if routine.save
      render json: routine, status: 201
    else
      render json: ErrorSerializer.serialize(routine.errors), status: 422
    end
  end

  def update
    # This works but is complex and fragile. I'll implement updating routines on the front-end and
    # see if this is actually the behavior that I want. If it is, then I'll want to refactor and
    # test this thoroughly.

    # Validating with a JSON schema and extracting the transaction into a service object would
    # probably help clean this up.

    # Another alternative would be updating the routine after each change in the UI automatically,
    # rather than having a "save" button that does all of this. Would I want this if an individual
    # update fails? So instead, adding a set would just create a new faf_set rather than waiting to
    # hit save and checking to whole routine for changes. Same thing with updating other things, like
    # deleting sets, or changing the routine name

    routine = Routine.find(params[:id])

    # 1) update non-nested attributes on routine (ex: name)

    # 2) delete sets not included in response body

    # 3) update or create associated sets
      # if there's an id provided
        # update order in routine if changed
      # if there's no id
        # create a new set

    routine.transaction do
      # 1)
      # update account name if changed
      routine.update!(name: routine_params[:name])

      # 2)
      # delete sets that aren't in the request body
      previous_set_ids = routine.faf_sets.map { |s| s.id }
      params_set_ids =
        if routine_params[:faf_sets_attributes]
          routine_params[:faf_sets_attributes]
            .select { |s| s[:id] != nil } # sets with ids
            .map { |s| s[:id] }
        else
          []
        end
      ids_of_sets_to_delete = previous_set_ids.reject { |id| params_set_ids.include?(id) }

      ids_of_sets_to_delete.each { |id| routine.faf_sets.find(id).destroy! }

     # 3)
     # update or create sets included in the request body
      unless routine_params[:faf_sets_attributes] == nil
        routine_params[:faf_sets_attributes].each do |faf_set|
          if faf_set[:id]
            # TODO: update order in routine if changed.
            #       Right now there isn't anything keeping track of the order, so will need to
            #       implement that first (something like a set_number attribute).
          else
            # if there's no id, create a new set
            routine.faf_sets.create!(exercise_id: faf_set[:exercise_id]) if faf_set[:id] == nil
            # TODO: This should throw an error if there's not an exercise with that exercise id
            #       So if the record isn't found.
          end
        end
      end

      routine.reload
    end

    render json: routine, status: 200

  rescue ActiveRecord::RecordInvalid => e
    # TODO: serialize the exception rather than doing this by hand
    render json: { errors: [{ message: e.message }] }, status: 422
  end

  private
    def routine_params
      params.require(:routine).permit(:name, faf_sets_attributes: [:id, :exercise_id])
    end
end
