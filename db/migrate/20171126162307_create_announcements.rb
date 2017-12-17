class CreateAnnouncements < ActiveRecord::Migration[5.1]
  def change
    create_table :announcements do |t|
      t.belongs_to :user, index: true
      t.string :game_title
      t.integer :game_type
      t.integer :game_min_players
      t.integer :game_max_players
      t.integer :game_min_age
      t.integer :game_status
      t.integer :game_min_duration
      t.integer :game_max_duration
      t.string :game_content, array: true
      t.string :game_tags, array: true
      t.string :title
      t.string :description
      t.string :availibity
      t.integer :min_reservation
      t.integer :max_reservation
      t.integer :renting_price
      t.integer :caution_price
      t.timestamps
    end
  end
end
