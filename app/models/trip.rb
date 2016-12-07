class Trip < ApplicationRecord
	belongs_to :user
	has_many :activities
	has_many :photos

	validates :location, presence: true;
end
