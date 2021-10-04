# frozen_string_literal: true

require 'test_helper'

class CryptoDataControllerTest < ActionDispatch::IntegrationTest
  setup do
    @crypto_datum = crypto_data(:one)
  end

  test 'should get index' do
    get crypto_data_url, as: :json
    assert_response :success
  end

  test 'should create crypto_datum' do
    assert_difference('CryptoDatum.count') do
      post crypto_data_url, params: { crypto_datum: {} }, as: :json
    end

    assert_response 201
  end

  test 'should show crypto_datum' do
    get crypto_datum_url(@crypto_datum), as: :json
    assert_response :success
  end

  test 'should update crypto_datum' do
    patch crypto_datum_url(@crypto_datum), params: { crypto_datum: {} }, as: :json
    assert_response 200
  end

  test 'should destroy crypto_datum' do
    assert_difference('CryptoDatum.count', -1) do
      delete crypto_datum_url(@crypto_datum), as: :json
    end

    assert_response 204
  end
end
