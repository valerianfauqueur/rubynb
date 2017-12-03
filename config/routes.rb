Rails.application.routes.draw do
  devise_for :users, path: 'auth',
                   path_names: {
                      sign_in: 'login',
                      sign_out: 'logout',
                      edit: 'profile'
                   }

  authenticate :user do
    resources :games do
      resources :announcements
    end
  end

  root 'home#index'

  get '/games/:game_id/announcements', to: 'announcements#create', as: :create_game_announcement, method: :post
end
