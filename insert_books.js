
const { MongoClient } = require('mongodb');


const uri = "mongodb://localhost:27017";

async function insertBooks() {
    const client = new MongoClient(uri);
    
    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        console.log("Connected successfully!");
        
        const database = client.db('plp_bookstore');
        const books = database.collection('books');
        
       
        const bookDocuments = [
            {
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                genre: "Classic",
                published_year: 1925,
                price: 12.99,
                in_stock: true,
                pages: 218,
                publisher: "Scribner"
            },
            {
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                genre: "Fiction",
                published_year: 1960,
                price: 14.99,
                in_stock: true,
                pages: 281,
                publisher: "J.B. Lippincott & Co."
            },
            {
                title: "1984",
                author: "George Orwell",
                genre: "Dystopian",
                published_year: 1949,
                price: 10.99,
                in_stock: false,
                pages: 328,
                publisher: "Secker & Warburg"
            },
            {
                title: "Pride and Prejudice",
                author: "Jane Austen",
                genre: "Romance",
                published_year: 1813,
                price: 9.99,
                in_stock: true,
                pages: 432,
                publisher: "T. Egerton"
            },
            {
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                genre: "Fantasy",
                published_year: 1937,
                price: 15.99,
                in_stock: true,
                pages: 310,
                publisher: "George Allen & Unwin"
            },
            {
                title: "Harry Potter and the Sorcerer's Stone",
                author: "J.K. Rowling",
                genre: "Fantasy",
                published_year: 1997,
                price: 18.99,
                in_stock: true,
                pages: 320,
                publisher: "Bloomsbury"
            },
            {
                title: "The Catcher in the Rye",
                author: "J.D. Salinger",
                genre: "Fiction",
                published_year: 1951,
                price: 12.49,
                in_stock: true,
                pages: 234,
                publisher: "Little, Brown and Company"
            },
            {
                title: "The Hunger Games",
                author: "Suzanne Collins",
                genre: "Dystopian",
                published_year: 2008,
                price: 16.99,
                in_stock: true,
                pages: 374,
                publisher: "Scholastic"
            },
            {
                title: "The Alchemist",
                author: "Paulo Coelho",
                genre: "Fiction",
                published_year: 1988,
                price: 11.99,
                in_stock: true,
                pages: 208,
                publisher: "HarperTorch"
            },
            {
                title: "Dune",
                author: "Frank Herbert",
                genre: "Science Fiction",
                published_year: 1965,
                price: 17.99,
                in_stock: true,
                pages: 412,
                publisher: "Chilton Books"
            }
        ];
        
        
        const result = await books.insertMany(bookDocuments);
        console.log(`✅ SUCCESS: ${result.insertedCount} books were inserted into the database!`);
        
       
        console.log("\n📚 Books inserted:");
        bookDocuments.forEach(book => {
            console.log(`- ${book.title} by ${book.author}`);
        });
        
    } catch (error) {
        console.error("❌ ERROR:", error);
    } finally {
        await client.close();
        console.log("📊 Database connection closed.");
    }
}

insertBooks();