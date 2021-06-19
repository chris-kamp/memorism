Rails
  .application
  .routes
  .draw do
    root 'pages#index'

    devise_for :users

    namespace :api do
      resources :decks
      resources :cards, only: %i[create destroy]
    end

    get '*path', to: 'pages#index'
  end
