class User < ApplicationRecord
  has_secure_password

  # If this app ends up being used by more than just me, I'll want to add some more validations.
  # This will do for now though.
  validates :email, presence: true, uniqueness: { case_sensitive: false }
end
