Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    post 'user_token' => 'user_token#create'
    resources :exercises, only: [:index, :create]
    resources :muscles, only: :index
    resources :routines, only: :create
  end
end
