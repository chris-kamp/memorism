User.destroy_all

users =
  User.create(
    [
      { email: 'user1@test.com', username: 'user1', password: 'password' },
      { email: 'user2@test.com', username: 'user2', password: 'password' },
      { email: 'user3@test.com', username: 'user3', password: 'password' },
    ],
  )

decks = []

users.each do |user|
  5.times do
    num = rand(10_000)
    deck =
      user.decks.create(
        {
          title: "Deck #{num}",
          description: "Description for deck #{num}",
          public: rand(10) > 5 ? true : false,
        },
      )
    decks.push(deck)
  end
end

decks.each do |deck|
  10.times do
    num = rand(10_000)
    deck.cards.create(
      { front: "Front of card #{num}", back: "Back of card #{num}" },
    )
  end
end
