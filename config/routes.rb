# frozen_string_literal: true

Rails
  .application
  .routes
  .draw do
  namespace :api do
    namespace :v1 do
      get '/crypto_data/nfts', to: 'crypto_data#nfts'
      get '/crypto_data/coin/:coin_uuid/history/:timeperiod', to: 'crypto_data#coin_history'
      get '/crypto_data/coins/:limit', to: 'crypto_data#get_coins'
      get '/crypto_data/stats', to: 'crypto_data#global_crypto_stats'
      get '/crypto_data/exchanges', to: 'crypto_data#crypto_exchanges'
      get '/crypto_data/coin_details/:coin_uuid',
          to: 'crypto_data#coin_details'

      get '/news/:newsCategory/:dayCount', to: 'news#get_news'
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
