class Announcement < ApplicationRecord
  belongs_to :game

  monetize :renting_price, :as =>"renting", :numericality => {
    :greater_than_or_equal_to => 1,
  }

  monetize :caution_price, :as =>"caution", :numericality => {
    :greater_than_or_equal_to => 1,
  }

  validates :title, :description, :renting_price, :caution_price, presence: true
  validates_length_of :title, :minimum => 4, :maximum => 140
  validates_length_of :description, :maximum => 5000
end
