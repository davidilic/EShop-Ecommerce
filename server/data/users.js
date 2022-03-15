import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Marko Markovic',
        email: 'marko@test.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Jana Jankovic',
        email: 'jana@test.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users
