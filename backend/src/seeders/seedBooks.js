const sequelize = require('../config/database');
const Book = require('../models/Book');

const books = [
  { titulo: 'Macacha Güemes', slug: 'macacha-guemes', isbn: '978-987-4986-10-8', precio: 29000, categoria: 'Historia', imagen: '/libros/macacha-guemes.png' },
  { titulo: 'Felicitas Guerrero', slug: 'felicitas-guerrero', isbn: '978-987-4986-08-5', precio: 29000, categoria: 'Biografía', imagen: '/libros/felicitas-guerrero.png' },
  { titulo: 'Árboles y Letras', slug: 'arboles-y-letras', isbn: '978-987-4986-05-4', precio: 12000, categoria: 'Poesía', imagen: '/libros/arboles-y-letras.png' },
  { titulo: 'La Cartera de los Dioses', slug: 'la-cartera-de-los-dioses', isbn: '978-987-4986-092', precio: 19000, categoria: 'Narrativa', imagen: '/libros/cartera-de-los-dioses.png' },
  { titulo: 'El amor entre pandemias', slug: 'el-amor-entre-pandemias', isbn: '978-987-4986-07-8', precio: 18000, categoria: 'Narrativa', imagen: '/libros/el-amor-entre-pandemias.png' },
  { titulo: 'Rituales Peligrosos', slug: 'rituales-peligrosos', isbn: '978-987-27829-7-9', precio: 24000, categoria: 'Narrativa', imagen: '/libros/rituales-peligrosos.png' },
  { titulo: 'Cristián Demaría', slug: 'cristian-demaria', isbn: '978-987-27829-6-2', precio: 25000, categoria: 'Biografía', imagen: '/libros/cristian-demaria.png' },
  { titulo: 'Regina y Marcelo', slug: 'regina-y-marcelo', isbn: '978-987-27829-4-8', precio: 28000, categoria: 'Narrativa', imagen: '/libros/regina-y-marcelo.png' },
  { titulo: 'El poder de la bruja', slug: 'el-poder-de-la-bruja', isbn: '978-987-4986-05-4-b', precio: 28000, categoria: 'Ensayo', imagen: '/libros/el-poder-de-la-bruja.png' },
  { titulo: 'Rosario de mi vida', slug: 'rosario-de-mi-vida', isbn: '978-987-4986-11-5', precio: 17000, categoria: 'Historia', imagen: '/libros/rosario-de-mi-vida.png' },
  { titulo: 'Todos los viajes, un viaje', slug: 'todos-los-viajes-un-viaje', isbn: '978-987-4986-12-2', precio: 17000, categoria: 'Narrativa' },
  { titulo: 'Mamá Antula', slug: 'mama-antula', isbn: '978-950-075-914-4', precio: 25000, categoria: 'Biografía' },
];

const seed = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await Book.bulkCreate(books);
    console.log(`Done: ${books.length} libros insertados`);
  } catch (error) {
    console.error('Error en seed:', error.message);
  } finally {
    await sequelize.close();
  }
};

seed();
