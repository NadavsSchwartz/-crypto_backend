# frozen_string_literal: true

module Api
  module V1
    class NewsController < ApplicationController
      def get_news
        category = params['newsCategory'] || 'bitcoin'
        article_count = params['articleCount'] || 8
        @response =
          HTTParty.get(
            "https://bing-news-search1.p.rapidapi.com/news/search?q=#{category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=#{article_count}&sortBy=Date",
            headers: {
              'x-bingapis-sdk' => 'true',
              'x-rapidapi-host' => 'bing-news-search1.p.rapidapi.com',
              'x-rapidapi-key' =>
                'b00b36ccb8msh742d2851ab5e32cp178798jsne7633fa8bb90'
            }
          )

        if !@response['errors'] || @response.code === 200
          render json: @response, status: 200
        elsif @response.headers['x-ratelimit-requests-remaining'].to_i < 1
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
    end
  end
end
