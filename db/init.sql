SELECT 'CREATE DATABASE reclamoweb3'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'reclamoweb3')\gexec