class Api::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token

  # This method is provided by Knock
  before_action :authenticate_user
end
