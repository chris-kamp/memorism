class CardSerializer
  include JSONAPI::Serializer
  attributes :front, :back, :deck_id
end
