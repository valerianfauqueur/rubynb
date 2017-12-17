class Picture < ActiveRecord::Base
  belongs_to :announcement

  has_attached_file :image,
    styles: { large: "1440x960", medium: "720x480", thumbnail:"100x67" },
    path: ":rails_root/public/images/products/:announcement_id/:style/:filename",
    url: "/images/products/:announcement_id/:style/:filename"

    validates :announcement, :presence => true
    validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
    validates_with AttachmentSizeValidator, attributes: :image, less_than: 3.megabytes

    Paperclip.interpolates :announcement_id do |attachment, style|
      attachment.instance.announcement_id
    end
end
