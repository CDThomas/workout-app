require 'rails_helper'

RSpec.describe Routine, type: :model do
  describe 'validations' do
    it "assigns a default of 'Unnamed Routine' to newly created routines" do
      routine = create(:routine, name: nil)
      expect(routine.name).to eq('Unnamed Routine')
    end

    it 'validates presence of name on updates' do
      routine = create(:routine, name: 'Upper A')
      routine.name = ''

      routine.valid?

      expect(routine.errors.messages[:name]).to include("can't be blank")
    end
  end

  describe 'associations' do
    it { is_expected.to have_many(:fa_sets) }
  end
end
