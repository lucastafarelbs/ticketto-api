import Knex from 'knex'

function dbConnector() {
  const {
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT
  } = process.env

  if (!DB_HOST || !DB_USERNAME || !DB_PASSWORD || !DB_NAME || !DB_PORT) {
    throw new Error('Database configs are missing!')
  }

  return Knex({
    client: 'pg',
    connection: {
      ssl: {rejectUnauthorized: false},
      host: DB_HOST,
      port: parseInt(DB_PORT),
      user: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME
    }
  })

}

export default dbConnector
