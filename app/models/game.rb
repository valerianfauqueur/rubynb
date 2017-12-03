class Game < ApplicationRecord
  belongs_to :user
  has_many :pictures, dependent: :destroy
  has_many :announcements, dependent: :destroy

  validates :min_players, :max_players,
            :min_age, :max_age, :status, :rentable, :name,
            presence: true
end
