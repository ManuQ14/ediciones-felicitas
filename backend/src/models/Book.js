const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
    // unique no se declara acá porque SQLite no soporta ALTER TABLE ADD UNIQUE.
    // La unicidad se garantiza en generateUniqueSlug del controller.
    // En PostgreSQL (prod) agregar el índice manualmente si hace falta.
  },
  tieneDigital: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  archivoDigital: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Ruta al archivo digital (PDF/epub) para descarga post-pago',
  },
  paginas: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  // Datos de envío físico — requeridos para cálculo de tarifa Andreani
  peso: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Peso en gramos (ej: 350)',
  },
  alto: {
    type: DataTypes.DECIMAL(5, 1),
    allowNull: true,
    comment: 'Alto en cm',
  },
  ancho: {
    type: DataTypes.DECIMAL(5, 1),
    allowNull: true,
    comment: 'Ancho en cm',
  },
  largo: {
    type: DataTypes.DECIMAL(5, 1),
    allowNull: true,
    comment: 'Largo/profundidad en cm',
  },
});

module.exports = Book;
