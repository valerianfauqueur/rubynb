class Picture < ActiveRecord::Base
  has_attached_file :image,
    styles: { large: "1440x960", medium: "720x480", thumbnail:"100x67" },
    path: ":rails_root/public/images/products/:id/:style/:filename",
    url: "/images/products/:id/:style/:filename"

    validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
