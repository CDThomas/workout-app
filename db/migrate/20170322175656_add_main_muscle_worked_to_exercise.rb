class AddMainMuscleWorkedToExercise < ActiveRecord::Migration[5.0]
  def change
    add_reference :exercises, :main_muscle_worked, foreign_key: { to_table: :muscles }
  end
end
