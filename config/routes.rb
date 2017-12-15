Rails.application.routes.draw do
  root 'home#index'

  devise_for :users, path: 'auth',
                   path_names: {
                      sign_in: 'login',
                      sign_out: 'logout',
                      edit: 'profile'
                   }

  authenticate :user do
    resources :announcements, only: [:new, :edit, :create, :update, :destroy]
  end

  resources :user, only: [:index, :show]

  get '/games/:game_id/announcements', to: 'announcements#create', as: :create_game_announcement, method: :post
end
