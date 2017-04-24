class Routine < ApplicationRecord
  # inverse_of is required for accepts_nested_attributes_for to work properly
  # see: http://stackoverflow.com/a/39098883
  # and: https://robots.thoughtbot.com/accepts-nested-attributes-for-with-has-many-through
  has_many :fa_sets, inverse_of: :routine
  accepts_nested_attributes_for :fa_sets
  before_validation :set_default_name, on: :create

  validates :name, presence: true

  private
    def set_default_name
      self.name ||= 'Unnamed Routine'
    end
end
