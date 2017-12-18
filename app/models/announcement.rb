class Announcement < ApplicationRecord
  belongs_to :user
  has_many :pictures, :inverse_of => :announcement, index_errors: true
  accepts_nested_attributes_for :pictures, :allow_destroy => true

  validates :game_title,
            :game_type,
            :game_min_players,
            :game_max_players,
            :game_min_age,
            :game_status,
            :game_min_duration,
            :game_max_duration,
            :title,
            :description,
            :availibity,
            :min_reservation,
            :max_reservation,
            :renting_price,
            :caution_price,
            :pictures,
            presence: true

  validates_length_of :game_title, :minimum => 3, :maximum => 30
  validates :game_type, numericality: { only_integer: true, greater_than: 0, less_than: 5 }
  validates :game_min_players, numericality: { only_integer: true, greater_than: 0, less_than: 1000 }
  validates :game_max_players, numericality: { only_integer: true, greater_than: :game_min_players, less_than: 1000 }
  validates :game_min_age, numericality: { only_integer: true, greater_than: 2, less_than: 19 }
  validates :game_status, numericality: { only_integer: true, greater_than: 0, less_than: 5 }
  validates :game_min_duration, numericality: { only_integer: true, greater_than: 0, less_than: 300 }
  validates :game_max_duration, numericality: { only_integer: true, greater_than: :game_min_duration, less_than: 600 }
  validates_length_of :title, :minimum => 3, :maximum => 30
  validates_length_of :description, :minimum => 10, :maximum => 5000
  validates_length_of :availibity, :minimum => 10, :maximum => 5000
  validates :min_reservation, numericality: { only_integer: true, greater_than: 0, less_than: 8 }
  validates :max_reservation, numericality: { only_integer: true, greater_than: :min_reservation, less_than: 366 }

  monetize :renting_price, :as =>"renting", :numericality => {
    :greater_than_or_equal_to => 1,
    :less_than_or_equal_to => 99999
  }

  monetize :caution_price, :as =>"caution", :numericality => {
    :greater_than_or_equal_to => 1,
    :less_than_or_equal_to => 99999
  }

  self.per_page = 20
end
