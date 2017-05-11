class Exercise < ApplicationRecord
  belongs_to :main_muscle_worked, class_name: 'Muscle'
  has_many :fa_sets

  validates_presence_of :main_muscle_worked
  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
