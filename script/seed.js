'use strict';

const db = require('../server/db');
const { User, Product, Category, ProductCategory } = require('../server/db/models');

async function seed () {
  await db.sync({ force: true });
  console.log('db synced!');

  const productsCatalog = [
    {
      title: 'One Week (Future)',
      price: 15.00,
      description: "Have plans you just don't want to wait for? Buy yourself a week!",
      quantity: 2,
      imgUrl: 'https://dummyimage.com/400x400/e2ffdb/000000.jpg&text=One+Week+(2018)'
    },
    {
      title: 'Tomorrow',
      price: 5.00,
      description: "You're always a day awaaaaay",
      quantity: 100,
      imgUrl: 'https://dummyimage.com/400x400/fdebff/000000.jpg&text=Tomorrow'
    },
    {
      title: 'Your 21st Birthday (Past)',
      price: 1000.00,
      description: 'Whether you remember or not, now you have the opportunity to go back to this (presumably) debaucherous night!',
      quantity: 16,
      imgUrl: 'https://dummyimage.com/400x400/ffecdb/000000.jpg&text=21st+Birthday'
    },
    {
      title: 'Your 21st Birthday (Future)',
      price: 15000.00,
      description: 'Enjoy a special day of pure, legal fun (We do not condone underage consumption of any alcoholic beverages)!',
      quantity: 9,
      imgUrl: 'https://dummyimage.com/400x400/ffecdb/000000.jpg&text=21st+Birthday'
    },
    {
      title: 'Any Week in the Year 2050',
      price: 750.00,
      description: 'If the Earth still exists ...',
      quantity: 11,
      imgUrl: 'https://dummyimage.com/400x400/dbf6ff/000000.jpg&text=2050+(One+Week)'
    },
    {
      title: "Trump's Last Day In Office",
      price: 1500000.00,
      description: 'Price only applies if you are a (regretful) registered Republican',
      quantity: 1,
      imgUrl: "https://dummyimage.com/400x400/ffecdb/000000.jpg&text=Trump's+Last+Day+In+Office"
    },
    {
      title: 'Read a Story',
      price: 20500.00,
      description:
        "A long, long time ago in a spiky, spiky galaxy ... After leaving the frantic planet Earth, a group of people fly toward a distant speck. The speck gradually resolves into a large, e-commerce web app. Civil war strikes the galaxy, which is ruled by Donald Trump, an evil gremlin capable of gluttony and terrifying violence. Terrified, a powerful woman known as Time Traveler flees the Empire, with her protector, Chronos. They head for New York on the planet Gracius Hopperus. When they finally arrive, a fight breaks out. Chronos uses his spicy arrow to defend Time. Chronos and Lady Time decide it's time to leave Gracius Hopperus and steal a tandem to shoot their way out. They encounter a tribe of men. Time Traveler is attacked and captured by the men and taken back to New York. Chronos must fight to save Lady Time but when he accidentally unearths a deprecated method, the entire future of the spiky, frantic galaxy is at stake.",
      quantity: 2,
      imgUrl: 'https://dummyimage.com/400x400/fdebff/000000.jpg&text=A+Beautiful+and+Heartbreaking+Story'
    },
    {
      title: 'Yesterday',
      price: 100.50,
      description: 'All my troubles seemed so far away ...',
      quantity: 4,
      imgUrl: 'https://dummyimage.com/400x400/ffecff/000000.jpg&text=Yesterday'
    },
    {
      title: 'Your First Day of High School',
      price: 2.00,
      description: 'Why would you want to go back to this day?!',
      quantity: 5,
      imgUrl: 'https://dummyimage.com/400x400/d1cfd1/000000&text=First+Day+of+High+School'
    },
    {
      title: 'First Date (Good)',
      price: 3000.50,
      description: 'End the night with something magical',
      quantity: 8,
      imgUrl: 'https://dummyimage.com/400x400/edf0c9/000000&text=First+Date'
    },
    {
      title: 'First Date (Bad)',
      price: 15.00,
      description: 'Perhaps a gag gift for a friend or an actual present for an enemy',
      quantity: 100,
      imgUrl: 'https://dummyimage.com/400x400/edf0c9/000000&text=First+Date'
    }
  ];

  const products = await Promise.all(
    productsCatalog.map(product => Product.create(product))
  );

  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);

  const categoriesCatalog = [
    {
      name: 'nostalgia',
    },
    {
      name: 'future',
    },
    {
      name: 'renaissance',
    }
  ];

  const categories = await Promise.all(
    categoriesCatalog.map(category => Category.create(category))
  );

  console.log(`seeded ${categories.length} categories`);
  console.log(`seeded successfully`);

  const usersCatalog = [
    {
      email: 'the.doctor@who.com',
      password: 'knockKnock',
      salt: 'pepper',
      googleId: 'blahblahblah',
      isAdmin: true
    },
    {
      email: 'river.song@who.com',
      password: 'spoilers',
      salt: 'pepper',
      googleId: 'blahblahblah',
      isAdmin: true
    },
    {
      email: 'amy.pond@who.com',
      password: 'ginger',
      salt: 'pepper',
      googleId: 'blahblahblah',
      isAdmin: false
    },
    {
      email: 'clara.oswald@who.com',
      password: 'theImpossibleGirl',
      salt: 'pepper',
      googleId: 'blahblahblah',
      isAdmin: false
    }
  ];

  const users = await Promise.all(
    usersCatalog.map(user => User.create(user))
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  const productCats = [
    {
      productId: 1,
      categoryId: 1
    }, {
      productId: 2, 
      categoryId: 2
    }, {
      productId: 3, 
      categoryId: 3
    }, {
      productId: 4, 
      categoryId: 3
    }, {
      productId: 5, 
      categoryId: 2
    }, {
      productId: 6, 
      categoryId: 1
    },
    {
      productId: 7, 
      categoryId: 1
    },
    {
      productId: 8, 
      categoryId: 3
    }
  ];

  const productCategories = await Promise.all(
    productCats.map(pc => ProductCategory.create(pc))
  );
}

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

console.log('seeding...');
