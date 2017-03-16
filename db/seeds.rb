exercise_names = [
  "Squat",
  "Leg press",
  "Lunge",
  "Deadlift",
  "Leg extension",
  "Leg curl",
  "Standing calf raise",
  "Seated calf raise",
  "Hip adductor",
  "Bench press",
  "Chest fly",
  "Push-up",
  "Pulldown",
  "Pull-up",
  "Bent-over row",
  "Upright row",
  "Shoulder press",
  "Shoulder fly",
  "Lateral raise",
  "Shoulder shrug",
  "Pushdown",
  "Triceps extension",
  "Biceps curl",
  "Crunch",
  "Russian twist",
  "Leg raise",
  "Back extension"
]

exercise_names.each do |name|
  Exercise.create(name: name)
end
