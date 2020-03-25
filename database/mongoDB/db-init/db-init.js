db.createUser({
  user: 'devUser',
  pwd: 'devSecretPassword',
  roles: [{ role: 'readWrite', db: 'room_book_db' }]
});
