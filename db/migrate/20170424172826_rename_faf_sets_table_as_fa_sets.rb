class RenameFafSetsTableAsFaSets < ActiveRecord::Migration[5.0]
  def change
    rename_table :faf_sets, :fa_sets
  end
end
