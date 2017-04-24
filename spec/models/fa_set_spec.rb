require 'rails_helper'

RSpec.describe FaSet, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:routine) }
    it { is_expected.to validate_presence_of(:exercise) }
  end

  describe 'associations' do
    it { is_expected.to belong_to(:routine) }
    it { is_expected.to belong_to(:exercise) }
  end
end
