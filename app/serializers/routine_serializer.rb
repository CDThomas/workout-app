class RoutineSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at
  has_many :fa_sets, key: :sets

  class FaSetSerializer < ActiveModel::Serializer
    attributes :id, :routine_id, :set_number

    attribute :exercise_id do
      object.exercise.id
    end

    attribute :exercise_name do
      object.exercise.name
    end

    attribute :main_muscle_worked do
      object.exercise.main_muscle_worked.name
    end
  end
end
