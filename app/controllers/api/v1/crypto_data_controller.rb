# frozen_string_literal: true

module Api
  module V1
    class CryptoDataController < ApplicationController
      # GET /crypto_data/nfts
      def nfts
        @response =
          HTTParty.get(
            'https://api.coinranking.com/v2/nfts?orderBy=auctionCreatedAt&orderDirection=desc&limit=10',
            headers: {
              'x-access-token' =>
                 'coinrankingb11dd5d6079f60e918417565de273e895b2fda51e7b353bd'
            }
          )
        if @response['status'] === 'success' || @response.code === 200
          render json: @response
        elsif @response.headers['x-ratelimit-remaining-month'].to_i < 1
          render json: {
            errors: 'api rate limit met for this month. try again next month'
          },
                 status: @response.code
        else
          render json: {
            errors: 'couldn\'t complete the request. please try again',
            data: @response
          },
                 status: @response.code
        end
      end

      # GET /crypto_data/stats
      def global_crypto_stats
        @response =
          HTTParty.get(
            'https://api.coinranking.com/v2/stats',
            headers: {
              'x-access-token' =>
                 'coinrankingb11dd5d6079f60e918417565de273e895b2fda51e7b353bd'
            }
          )
        if @response['status'] === 'success' || @response.code === 200
          render json: @response
        elsif @response.headers['x-ratelimit-remaining-month'].to_i < 1
          render json: {
            errors: 'api rate limit met for this month. try again next month'
          },
                 status: @response.code
        else
          render json: {
            errors: 'couldn\'t complete the request. please try again',
            data: @response
          },
                 status: @response.code
        end
      end

      # /exchanges?orderBy=24hVolume&orderDirection=desc

      # POST /crypto_data/exchanges
      def crypto_exchanges
        @response =
          HTTParty.get(
            'https://api.coinranking.com/v2/exchanges?orderBy=24hVolume&orderDirection=desc',
            headers: {
              'x-access-token' =>
                 'coinrankingb11dd5d6079f60e918417565de273e895b2fda51e7b353bd'
            }
          )
        if @response['status'] === 'success' || @response.code === 200
          render json: @response
        elsif @response.headers['x-ratelimit-remaining-month'].to_i < 1
          render json: {
            errors: 'api rate limit met for this month. try again next month'
          },
                 status: @response.code
        else
          render json: {
            errors: 'couldn\'t complete the request. please try again',
            data: @response
          },
                 status: @response.code
        end
      end

      # GET /crypto_data/1
      # GET createRequest(`/coin/${coinId}
      def coin_details
        coin_uuid = params['coin_uuid']
        if coin_uuid
          @response =
            HTTParty.get(
              "https://api.coinranking.com/v2/coin/#{coin_uuid}",
              headers: {
                'x-access-token' =>
                   'coinrankingb11dd5d6079f60e918417565de273e895b2fda51e7b353bd'
              }
            )
          if @response['status'] === 'success' || @response.code === 200
            render json: @response
          elsif @response.headers['x-ratelimit-remaining-month'].to_i < 1
            render json: {
              errors:
                 'api rate limit met for this month. try again next month'
            },
                   status: 422
          else
            render json: {
              errors: 'couldn\'t complete the request. please try again',
              data: @response
            },
                   status: @response.code
          end
        else
          render json: {
            errors:
               'couldn\'t find any coin id. please recheck the request and try again',
            data: @response || null
          },
                 status: 404 || @response.code
        end
      end

      # POST /crypto_data/coins?limit=${amount_of_coins}
      def get_coins
        amount_of_coins = params['limit'] || 10

        @response =
          HTTParty.get(
            "https://api.coinranking.com/v2/coins?limit=#{amount_of_coins}",
            headers: {
              'x-access-token' =>
                 'coinrankingb11dd5d6079f60e918417565de273e895b2fda51e7b353bd'
            }
          )
        if @response['status'] === 'success' || @response.code === 200
          render json: @response
        elsif @response.headers['x-ratelimit-remaining-month'].to_i < 1
          render json: {
            errors: 'api rate limit met for this month. try again next month'
          },
                 status: 422
        else
          render json: {
            errors: 'couldn\'t complete the request. please try again',
            data: @response
          },
                 status: @response.code
        end
      end

      # GET coin/${coin_uuid}/history/${timeperiod}
      def coin_history
        coin_uuid = params['coin_uuid']
        timeperiod = params['timeperiod']
        if coin_uuid && timeperiod
          @response =
            HTTParty.get(
              "https://api.coinranking.com/v2/coin/#{coin_uuid}/history?timePeriod=#{timeperiod}",
              headers: {
                'x-access-token' =>
                   'coinrankingb11dd5d6079f60e918417565de273e895b2fda51e7b353bd'
              }
            )
          if @response['status'] === 'success' || @response.code === 200
            render json: @response
          elsif @response.headers['x-ratelimit-remaining-month'].to_i < 1
            render json: {
              errors:
                 'api rate limit met for this month. try again next month'
            },
                   status: 422
          else
            render json: {
              errors: 'couldn\'t complete the request. please try again',
              data: @response
            },
                   status: @response.code
          end
        else
          render json: {
            errors:
               'couldn\'t complete the request. please double check the params passed.',
            data: params
          },
                 status: 404
        end
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_crypto_data
        @crypto_data = CryptoData.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
    end
  end
end
