class DeckSerializer
  include JSONAPI::Serializer
  attributes :title, :description, :public, :user_id, :created_at, :updated_at

  has_many :cards
  belongs_to :user
end
