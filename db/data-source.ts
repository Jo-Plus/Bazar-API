import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  // إذا وجد رابط URL كامل يستخدمه، وإلا يستخدم التقسيم القديم
  // url: process.env.DATABASE_URL, 
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  logging: false,
  synchronize: false,
  ssl: {
    rejectUnauthorized: false, // مهم جداً للاتصال بـ Neon/Supabase
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
