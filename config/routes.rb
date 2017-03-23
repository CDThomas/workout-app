Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    resources :exercises, only: [:index, :create]
    resources :muscles, only: :index
  end
end
