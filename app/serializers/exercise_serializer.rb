class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name

  belongs_to :main_muscle_worked do
    object.main_muscle_worked.name
  end
end
