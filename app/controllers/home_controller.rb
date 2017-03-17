class HomeController < ApplicationController
  def index
    @app_props = { exercises: Exercise.all }
  end
end
