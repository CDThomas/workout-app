class RoutineSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at
  has_many :faf_sets, key: :sets

  class FafSetSerializer < ActiveModel::Serializer
    attribute :id

    attribute :exercise_id do
      object.exercise.id
    end

    attribute :exercise_name do
      object.exercise.name
    end
  end
end
