Rails.application.routes.draw do
  devise_for :users, path: 'auth',
                   path_names: {
                      sign_in: 'login',
                      sign_out: 'logout',
                      edit: 'profile'
                   }
  root 'welcome#index'
  resources :announcements
  resources :games
end
