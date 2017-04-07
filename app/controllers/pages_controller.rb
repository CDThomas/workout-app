class PagesController < ApplicationController
  def index
    exercises = Exercise.order(name: :asc).limit(10)
    serialized_exercises = ActiveModelSerializers::SerializableResource.new(exercises).serializable_hash
    @app_props = serialized_exercises
  end
end
