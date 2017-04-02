class CreateFafSets < ActiveRecord::Migration[5.0]
  def change
    create_table :faf_sets do |t|
      t.references :routine
      t.references :exercise

      t.timestamps
    end
  end
end
