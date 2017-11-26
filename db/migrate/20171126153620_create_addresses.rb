class CreateAddresses < ActiveRecord::Migration[5.1]
  def change
    create_table :addresses do |t|
      t.string :street_number
      t.string :street_name
      t.string :city
      t.string :zip_code
      t.string :contry
      t.string :full_name
      t.float :lat
      t.float :lng
    end
  end
end
