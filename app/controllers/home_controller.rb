class HomeController < ApplicationController
  def index
    @app_props = { name: "Drew" }
  end
end
