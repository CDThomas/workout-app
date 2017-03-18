require 'rails_helper'

RSpec.describe Exercise, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
  end

  describe 'attributes' do
    it { is_expected.to define_enum_for(:main_muscle_worked) }
    # TODO: test emum values if I decide I like using an enum for this
  end
end
