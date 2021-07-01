class CardSerializer
  include JSONAPI::Serializer
  attributes :front, :back, :deck_id, :created_at, :updated_at
end
