class Trip < ApplicationRecord
	belongs_to :user
	has_many :activities, dependent: :destroy
	has_many :photos, dependent: :destroy

	validates :location, presence: true;
end
