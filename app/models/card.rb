class Card < ApplicationRecord
  belongs_to :deck

  validates :front, presence: true, length: { maximum: 200 }
  validates :back, presence: true, length: { maximum: 200 }
end
