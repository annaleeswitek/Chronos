/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db');
const { User, Product, Category } = require('../server/db/models');

async function seed () {
  await db.sync({force: true});
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ]);

  const productsCatalog = [
    {
      title: 'one week',
      price: 15.00,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, dui sed gravida maximus, diam dui ornare eros, eu euismod elit diam nec augue. Suspendisse rutrum nunc justo, id gravida turpis vehicula at. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque sed dui posuere, facilisis ex ut, semper tellus. Nunc sit amet bibendum lacus, ut cursus lorem. Aliquam sed porta elit. Cras aliquet sapien massa, quis faucibus tellus vestibulum et. Nulla quis ultricies urna.',
      quantity: 2,
      imgUrl: 'img PENDING'
    },
    {
      title: 'tomorrow',
      price: 5.00,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, dui sed gravida maximus, diam dui ornare eros, eu euismod elit diam nec augue. Suspendisse rutrum nunc justo, id gravida turpis vehicula at. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque sed dui posuere, facilisis ex ut, semper tellus. Nunc sit amet bibendum lacus, ut cursus lorem. Aliquam sed porta elit. Cras aliquet sapien massa, quis faucibus tellus vestibulum et. Nulla quis ultricies urna.',
      quantity: 100,
      imgUrl: 'img PENDING'
    },
    {
      title: 'your birthday',
      price: 500.00,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula, dui sed gravida maximus, diam dui ornare eros, eu euismod elit diam nec augue. Suspendisse rutrum nunc justo, id gravida turpis vehicula at. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque sed dui posuere, facilisis ex ut, semper tellus. Nunc sit amet bibendum lacus, ut cursus lorem. Aliquam sed porta elit. Cras aliquet sapien massa, quis faucibus tellus vestibulum et. Nulla quis ultricies urna.',
      quantity: 1,
      imgUrl: 'img PENDING'
    }
  ];

  const products = await Promise.all(
    productsCatalog.map(product => Product.create(product))
  );
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);

  const categoriesCatalog = [
    {
      name: 'nostalgia'
    },
    {
      name: 'future'
    },
    {
      name: 'renaissance'
    }
  ];

  const categories = await Promise.all(
    categoriesCatalog.map(category => Category.create(category))
  );
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${categories.length} categories`);
  console.log(`seeded successfully`);
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...');
