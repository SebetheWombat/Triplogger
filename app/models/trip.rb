class Trip < ApplicationRecord
	belongs_to :user
	has_many :activities
	has_many :photos

	validates_inclusion_of :rating, in: 1..10
end
