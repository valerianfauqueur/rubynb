class CreateReservations < ActiveRecord::Migration[5.1]
  def change
    create_table :reservations do |t|
      t.belongs_to :user, index: true
      t.belongs_to :game, index: true
      t.date :startDate
      t.date :endDate
      t.string :status
    end
  end
end
