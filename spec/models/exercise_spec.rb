require 'rails_helper'

RSpec.describe Exercise, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name).case_insensitive }

    it { is_expected.to validate_presence_of(:main_muscle_worked) }
  end

  describe 'associations' do
    it { is_expected.to belong_to(:main_muscle_worked).class_name('Muscle') }
    it { is_expected.to have_many(:fa_sets) }
  end
end
