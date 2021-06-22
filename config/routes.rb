Rails
  .application
  .routes
  .draw do
    root 'pages#index'

    devise_for :users

    namespace :api do
      resources :decks
      resources :cards, only: %i[create destroy show update]
    end

    get '*path', to: 'pages#index'
  end
