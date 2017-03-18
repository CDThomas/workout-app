class AddMainMuscleWorkedToExercise < ActiveRecord::Migration[5.0]
  def change
    add_column :exercises, :main_muscle_worked, :integer
  end
end
