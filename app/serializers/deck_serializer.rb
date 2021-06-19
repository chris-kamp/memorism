class DeckSerializer
  include JSONAPI::Serializer
  attributes :title, :description, :public, :user_id

  has_many :cards
end
