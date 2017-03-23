class Muscle < ApplicationRecord
  has_many :exercises, foreign_key: :main_muscle_worked_id, inverse_of: :muscle
  validates :name, presence: true,  uniqueness: { case_sensitive: false }
end
