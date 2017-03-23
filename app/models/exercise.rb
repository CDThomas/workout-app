class Exercise < ApplicationRecord
  belongs_to :main_muscle_worked, class_name: 'Muscle', inverse_of: :exercises

  # Specifying inverse_of in associations for this presence validation
  # See http://guides.rubyonrails.org/active_record_validations.html#presence
  validates_presence_of :main_muscle_worked
  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
