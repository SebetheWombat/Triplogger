class Photo < ApplicationRecord
	has_attached_file :image, styles: {medium: "300x300>"}
	belongs_to :trip

	validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
