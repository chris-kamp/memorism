class Deck < ApplicationRecord
  belongs_to :user
  has_many :cards, dependent: :destroy

  validates :title, presence: true
  validates :description, presence: true
  validates :public, inclusion: { in: [true, false], message: "must be true or false" }
end
