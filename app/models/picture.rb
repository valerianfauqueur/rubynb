class Picture < ActiveRecord::Base
  belongs_to :game

  has_attached_file :image,
    styles: { large: "1440x960", medium: "720x480", thumbnail:"100x67" },
    path: ":rails_root/public/images/products/:id/:style/:filename",
    url: "/images/products/:id/:style/:filename"

    validates_attachment :image, presence: true
    do_not_validate_attachment_file_type :image
end
