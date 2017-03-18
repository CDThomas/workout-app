class Exercise < ApplicationRecord
  enum main_muscle_worked: [
    :chest,
    :lats,
    :middle_back,
    :lower_back,
    :traps,
    :biceps,
    :triceps,
    :shoulders,
    :glutes,
    :quads,
    :hamstrings,
    :calves,
    :abs
  ]

  validates :name, presence: true
end
