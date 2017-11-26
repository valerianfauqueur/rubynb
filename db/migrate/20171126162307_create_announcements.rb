class CreateAnnouncements < ActiveRecord::Migration[5.1]
  def change
    create_table :announcements do |t|
      t.belongs_to :game, index: true
      t.string :title
      t.string :description
      t.integer :min_reservation
      t.integer :max_reservation
      t.integer :renting_price
      t.integer :caution_price
    end
  end
end
