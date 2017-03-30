class Routine < ApplicationRecord
  # inverse_of is required for accepts_nested_attributes_for to work properly
  # see: http://stackoverflow.com/a/39098883
  # and: https://robots.thoughtbot.com/accepts-nested-attributes-for-with-has-many-through
  has_many :faf_sets, inverse_of: :routine
  accepts_nested_attributes_for :faf_sets

  validates :name, presence: true,  uniqueness: { case_sensitive: false }
end
