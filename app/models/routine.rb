class Routine < ApplicationRecord
  has_many :faf_sets
  validates :name, presence: true,  uniqueness: { case_sensitive: false }
end
