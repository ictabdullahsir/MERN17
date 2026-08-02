db.orders.aggregate([
  // 1. Join Order to Book
  {
    $lookup: {
      from: "books",
      localField: "bookId",
      foreignField: "_id",
      as: "book"
    }
  },
  {
    $unwind: "$book" // Flatten book array so we can access book.authorId
  },

  // 2. Join Book to Author using the joined book's authorId
  {
    $lookup: {
      from: "authors",
      localField: "book.authorId", // Field inside the flattened book object
      foreignField: "_id",
      as: "author"
    }
  },
  {
    $unwind: "$author" // Flatten author array
  },

  // 3. Format output
  {
    $project: {
      _id: 1,
      orderDate: 1,
      bookTitle: "$book.title",
      authorName: "$author.name"
    }
  }
]);