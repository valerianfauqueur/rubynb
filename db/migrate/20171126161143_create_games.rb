class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.belongs_to :user, index: true
      t.string :name
      t.integer :max_players
      t.integer :min_players
      t.integer :min_age
      t.integer :max_age
      t.string :status
      t.boolean :rentable
    end
  end
end
