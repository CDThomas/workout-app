require 'rails_helper'

RSpec.describe Routine, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
  end

  describe 'associations' do
    it { is_expected.to have_many(:faf_sets) }
  end
end
