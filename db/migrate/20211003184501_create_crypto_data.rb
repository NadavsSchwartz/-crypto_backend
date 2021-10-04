# frozen_string_literal: true

class CreateCryptoData < ActiveRecord::Migration[6.0]
  def change
    create_table :crypto_data, &:timestamps
  end
end
