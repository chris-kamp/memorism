User.destroy_all

User.create(
  [
    { email: 'user1@test.com', username: 'user1', password: 'password' },
    { email: 'user2@test.com', username: 'user2', password: 'password' },
    { email: 'user3@test.com', username: 'user3', password: 'password' },
  ],
)

User.first.decks.create(
  [
    {
      title: 'User 1 Deck 1',
      description: 'First public deck',
      public: true,
      cards:
        Card.create(
          [
            {
              front: 'Front of the first card',
              back: 'Back of the first card',
            },
          ],
        ),
    },
    {
      title: 'User 1 Deck 2',
      description: 'Second deck, is public',
      public: true,
    },
    {
      title: 'User 1 Deck 3',
      description: 'Third deck, is private',
      public: false,
    },
  ],
)

User.last.decks.create(
  [
    {
      title: 'User 2 Deck 1',
      description: "User 3's first public deck",
      public: true,
    },
    {
      title: 'User 2 Deck 2',
      description: "User 3's second deck, is private",
      public: false,
    },
    {
      title: 'User 2 Deck 3',
      description: "User 3's third deck, is public",
      public: true,
    },
  ],
)
