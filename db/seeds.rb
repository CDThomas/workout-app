muscles = [
  'chest',
  'lats',
  'middle back',
  'lower back',
  'traps',
  'biceps',
  'triceps',
  'shoulders',
  'glutes',
  'quads',
  'hamstrings',
  'calves',
  'abs'
]

exercises = [
  {
    name: 'Squat',
    main_muscle_worked: 'quads'
  },
  {
    name: 'Leg press',
    main_muscle_worked: 'quads'
  },
  {
    name: 'Lunge',
    main_muscle_worked: 'quads'
  },
  {
    name: 'Deadlift',
    main_muscle_worked: 'hamstrings'
  },
  {
    name: 'Leg extension',
    main_muscle_worked: 'quads'
  },
  {
    name: 'Leg curl',
    main_muscle_worked: 'hamstrings'
  },
  {
    name: 'Standing calf raise',
    main_muscle_worked: 'calves'
  },
  {
    name: 'Seated calf raise',
    main_muscle_worked: 'calves'
  },
  {
    name: 'Bench press',
    main_muscle_worked: 'chest'
  },
  {
    name: 'Chest fly',
    main_muscle_worked: 'chest'
  },
  {
    name: 'Push-up',
    main_muscle_worked: 'chest'
  },
  {
    name: 'Pulldown',
    main_muscle_worked: 'lats'
  },
  {
    name: 'Pull-up',
    main_muscle_worked: 'lats'
  },
  {
    name: 'Bent-over row',
    main_muscle_worked: 'middle back'
  },
  {
    name: 'Upright row',
    main_muscle_worked: 'shoulders'
  },
  {
    name: 'Shoulder press',
    main_muscle_worked: 'shoulders'
  },
  {
    name: 'Shoulder fly',
    main_muscle_worked: 'shoulders'
  },
  {
    name: 'Lateral raise',
    main_muscle_worked: 'shoulders'
  },
  {
    name: 'Shrug',
    main_muscle_worked: 'traps'
  },
  {
    name: 'Pushdown',
    main_muscle_worked: 'triceps'
  },
  {
    name: 'Triceps extension',
    main_muscle_worked: 'triceps'
  },
  {
    name: 'Biceps curl',
    main_muscle_worked: 'biceps'
  },
  {
    name: 'Crunch',
    main_muscle_worked: 'abs'
  },
  {
    name: 'Russian twist',
    main_muscle_worked: 'abs'
  },
  {
    name: 'Leg raise',
    main_muscle_worked: 'abs'
  },
  {
    name: 'Back extension',
    main_muscle_worked: 'lower back'
  }
]

exercises.each do |attributes|
  main_muscle_worked = Muscle.find_or_create_by(name: attributes[:main_muscle_worked])

  Exercise.create(
    name: attributes[:name],
    main_muscle_worked: main_muscle_worked
  )
end
