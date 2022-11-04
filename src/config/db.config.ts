module.exports = {
  DB: 'HW3',
  USER: 'postgres',
  PASSWORD: 'trung123',
  host: 'localhost',
  port: '5432',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
}