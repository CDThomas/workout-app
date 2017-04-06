Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    post 'user_token' => 'user_token#create'
    resources :exercises, only: [:index, :create]
    resources :muscles, only: :index
    resources :routines, only: :create
  end

  # This sends all other routes to React Router
  get '*all', to: 'pages#index'
end
