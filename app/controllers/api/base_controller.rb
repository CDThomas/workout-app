class Api::BaseController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user # This method is provided by Knock

  private
    def record_not_found
      head :not_found
    end
end
