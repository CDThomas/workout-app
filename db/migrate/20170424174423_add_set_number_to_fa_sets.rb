class AddSetNumberToFaSets < ActiveRecord::Migration[5.0]
  def change
    add_column :fa_sets, :setNumber, :integer
  end
end
