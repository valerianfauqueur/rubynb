class CreatePicture < ActiveRecord::Migration[5.1]
  def change
    create_table :pictures do |t|
      t.attachment :image
      t.belongs_to :announcement, index: true
    end
  end
end
