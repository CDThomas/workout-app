class Exercise < ApplicationRecord
  # Oof, this seemed simple, but actually makes querying by main_muscle_worked tough.
  # A muscle table would simplify search, but it really only needs a name column. I would be
  # able to re-use the table if I decided to have a relationship with more than one muscle
  # worked (something like all_muslces_worked). That would also let muscles correspond to a muscle
  # group (which could be useful, or just unnecessarily complex for what I need).
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
