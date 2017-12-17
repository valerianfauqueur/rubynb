class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_attached_file :avatar,
    styles: { medium: "300x300>", thumb: "100x100>" },
    default_url: '/assets/default_profile.png',
    path: ":rails_root/public/images/profile/:id/:style/:hash.:extension",
    url: "/images/profile/:id/:style/:hash.:extension",
    :hash_secret => "ilikesgems"

  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
  validates_with AttachmentSizeValidator, attributes: :avatar, less_than: 3.megabytes

  has_many :addresses, dependent: :destroy
  has_many :reservations

  validates :first_name, presence: true, length: {maximum: 65}
  validates :last_name, presence: true, length: {maximum: 65}
end
