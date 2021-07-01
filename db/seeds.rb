User.destroy_all

users =
  User.create(
    [
      { email: 'user1@test.com', username: 'smallbird373', password: 'password' },
      { email: 'user2@test.com', username: 'lazyladybug599', password: 'password' },
      { email: 'user3@test.com', username: 'angryfish844', password: 'password' },
      { email: 'user4@test.com', username: 'heavytiger460', password: 'password' },
      { email: 'user5@test.com', username: 'beautifulsnake812', password: 'password' },
    ],
  )

decks = []

users[0].decks.create(
    {
      title: "Capital Cities",
      description: "Learn a few of the world's capitals",
      public: true,
      cards: Card.create([
        {front: "Afghanistan", back: "Kabul"},
        {front: "Australia", back: "Canberra"},
        {front: "Austria", back: "Kabul"},
        {front: "Belarus", back: "Minsk"},
        {front: "Botswana", back: "Gaborone"},
        {front: "Chile", back: "Santiago"},
        {front: "Japan", back: "Tokyo"},
        {front: "Monaco", back: "Monaco"},
        {front: "Poland", back: "Warsaw"}
      ])
    }
)

users[1].decks.create(
    {
      title: "Books and Authors",
      description: "Memorise the authors of these famous novels",
      public: true,
      cards: Card.create([
        {front: "Ulysses", back: "James Joyce"},
        {front: "The Great Gatsby", back: "F. Scott Fitzgerald"},
        {front: "War and Peace", back: "Leo Tolstoy"},
        {front: "Crime and Punishment", back: "Fyodor Dostoyevsky"},
        {front: "The Catcher in the Rye", back: "J. D. Salinger"},
        {front: "Pride and Prejudice", back: "Jane Austen"},
        {front: "Catch 22", back: "Joseph Heller"}
      ])
    }
)

users[1].decks.create(
    {
      title: "An empty deck",
      description: "This is what a deck with no cards looks like",
      public: true
    }
)

users[2].decks.create(
    {
      title: "Movie Quotes",
      description: "Learn the origin of these well-known movie quotes",
      public: true,
      cards: Card.create([
        {front: "I'm going to make him an offer he can't refuse.", back: "The Godfather"},
        {front: "Here's looking at you, kid.", back: "Casablanca"},
        {front: "What we've got here is failure to communicate.", back: "Cool Hand Luke"},
        {front: "You can't handle the truth!", back: "A Few Good Men"},
        {front: "You're gonna need a bigger boat.", back: "Jaws"}
      ])
    }
)

users[2].decks.create(
    {
      title: "A private deck",
      description: "No one can see this but the user who created it",
      public: false
    }
)

users[3].decks.create(
    {
      title: "Olympic Cities",
      description: "Memorise the host cities for the Olympic Games",
      public: true,
      cards: Card.create([
        {front: "2016", back: "	Rio de Janeiro"},
        {front: "2012", back: "London"},
        {front: "2008", back: "Beijing"},
        {front: "2004", back: "Athens"},
        {front: "2000", back: "Australia"},
        {front: "1996", back: "Atlanta"},
        {front: "1992", back: "Barcelona"},
        {front: "1988", back: "Seoul"},
        {front: "1984", back: "Los Angeles"},
        {front: "1980", back: "Moscow"},
        {front: "1976", back: "Montreal"},
        {front: "1972", back: "Munich"}
      ])
    }
)

users[4].decks.create(
    {
      title: "Ruby array methods",
      description: "Learn some useful methods for manipulating arrays in Ruby",
      public: true,
      cards: Card.create([
        {front: ".count", back: "Return the number of elements in an array"},
        {front: ".each", back: "Iterate over an array, calling a given block for each element"},
        {front: ".empty?", back: "Return true if the array is empty, or else false"},
        {front: ".filter, .select", back: "Return a new array containing all elements of the original array for which a given block returns true"},
        {front: ".include?", back: "Return true if a given value is present in the array, or else false"},
        {front: ".map", back: "Return a new array containing the values returned by a given block when passed each element of the original array"},
        {front: ".push", back: "Append a given element to the end of the array"},
        {front: ".reject", back: "Return a new array containing only those elements for which a given block returns false"},
        {front: ".reverse", back: "Return a new array containing the same elements in reverse order"}
      ])
    }
)

