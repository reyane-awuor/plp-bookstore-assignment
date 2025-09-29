
const { MongoClient } = require('mongodb');


const uri = "mongodb://localhost:27017";

async function runQueries() {
    const client = new MongoClient(uri);
    
    try {
        console.log("🔗 Connecting to MongoDB...");
        await client.connect();
        console.log("✅ Connected successfully!\n");
        
        const database = client.db('plp_bookstore');
        const books = database.collection('books');

      
        console.log("=".repeat(50));
        console.log("TASK 2: BASIC CRUD OPERATIONS");
        console.log("=".repeat(50));
        
        
        console.log("\n1. 📖 All Fantasy books:");
        const fantasyBooks = await books.find({ genre: "Fantasy" }).toArray();
        fantasyBooks.forEach(book => {
            console.log(`   - ${book.title} by ${book.author}`);
        });

        
        console.log("\n2. 📅 Books published after 2000:");
        const recentBooks = await books.find({ published_year: { $gt: 2000 } }).toArray();
        recentBooks.forEach(book => {
            console.log(`   - ${book.title} (${book.published_year})`);
        });

       
        console.log("\n3. ✍️ Books by J.K. Rowling:");
        const authorBooks = await books.find({ author: "J.K. Rowling" }).toArray();
        authorBooks.forEach(book => {
            console.log(`   - ${book.title}`);
        });

      
        console.log("\n4. 💰 Updating price of 'The Great Gatsby' from $12.99 to $13.99:");
        const updateResult = await books.updateOne(
            { title: "The Great Gatsby" },
            { $set: { price: 13.99 } }
        );
        console.log(`   ✅ Modified ${updateResult.modifiedCount} document(s)`);

       
        console.log("\n5. 🗑️ Deleting 'The Alchemist':");
        const deleteResult = await books.deleteOne({ title: "The Alchemist" });
        console.log(`   ✅ Deleted ${deleteResult.deletedCount} document(s)`);

        
        console.log("\n" + "=".repeat(50));
        console.log("TASK 3: ADVANCED QUERIES");
        console.log("=".repeat(50));
        
        
        console.log("\n1. ✅ Books in stock published after 2000:");
        const inStockRecent = await books.find({ 
            in_stock: true, 
            published_year: { $gt: 2000 } 
        }).toArray();
        inStockRecent.forEach(book => {
            console.log(`   - ${book.title} (${book.published_year}) - $${book.price}`);
        });

        
        console.log("\n2. 🎯 Books with only title, author, and price fields:");
        const projectedBooks = await books.find({})
            .project({ title: 1, author: 1, price: 1, _id: 0 })
            .limit(3)
            .toArray();
        console.log(projectedBooks);

        
        console.log("\n3. 📊 Books sorted by price (low to high):");
        const sortedAsc = await books.find({})
            .sort({ price: 1 })
            .project({ title: 1, price: 1, _id: 0 })
            .limit(3)
            .toArray();
        console.log(sortedAsc);

        console.log("\n4. 📈 Books sorted by price (high to low):");
        const sortedDesc = await books.find({})
            .sort({ price: -1 })
            .project({ title: 1, price: 1, _id: 0 })
            .limit(3)
            .toArray();
        console.log(sortedDesc);

        
        console.log("\n5. 📄 Pagination - Page 1 (first 3 books):");
        const page1 = await books.find({})
            .limit(3)
            .skip(0)
            .toArray();
        page1.forEach(book => {
            console.log(`   - ${book.title}`);
        });

        console.log("\n6. 📄 Pagination - Page 2 (next 3 books):");
        const page2 = await books.find({})
            .limit(3)
            .skip(3)
            .toArray();
        page2.forEach(book => {
            console.log(`   - ${book.title}`);
        });

      
        console.log("\n" + "=".repeat(50));
        console.log("TASK 4: AGGREGATION PIPELINE");
        console.log("=".repeat(50));
        
        
        console.log("\n1. 📊 Average book price by genre:");
        const avgPriceByGenre = await books.aggregate([
            {
                $group: {
                    _id: "$genre",
                    averagePrice: { $avg: "$price" },
                    bookCount: { $sum: 1 }
                }
            },
            {
                $sort: { averagePrice: -1 }
            }
        ]).toArray();
        avgPriceByGenre.forEach(genre => {
            console.log(`   - ${genre._id}: $${genre.averagePrice.toFixed(2)} (${genre.bookCount} books)`);
        });

       
        console.log("\n2. 👨‍💼 Author with most books:");
        const authorMostBooks = await books.aggregate([
            {
                $group: {
                    _id: "$author",
                    bookCount: { $sum: 1 }
                }
            },
            {
                $sort: { bookCount: -1 }
            },
            {
                $limit: 3
            }
        ]).toArray();
        authorMostBooks.forEach(author => {
            console.log(`   - ${author._id}: ${author.bookCount} books`);
        });

       
        console.log("\n" + "=".repeat(50));
        console.log("TASK 5: INDEXING");
        console.log("=".repeat(50));
        
       
        console.log("\n1. 🔍 Creating index on title field...");
        await books.createIndex({ title: 1 });
        console.log("   ✅ Index created on title field");

        console.log("\n2. 🔍 Creating compound index on author and published_year...");
        await books.createIndex({ author: 1, published_year: 1 });
        console.log("   ✅ Compound index created on author and published_year");

        console.log("\n🎉 ALL TASKS COMPLETED SUCCESSFULLY!");

    } catch (error) {
        console.error("❌ ERROR:", error);
    } finally {
        await client.close();
        console.log("\n🔌 Database connection closed.");
    }
}

runQueries();