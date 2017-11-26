class Address < ApplicationRecord
  validates :zip_code, :street_number, :street_name, :city, :country, :full_name,  presence: true
  validates_format_of :zip_code, :with => /^\d{5}(-\d{4})?$/, :message => "Zip code should contain 5 digit"
end
