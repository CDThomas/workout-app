Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    resources :exercises, only: :index
  end
end
