const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const uniqid = require('uniqid')

const app = express();
const server = http.Server(app);
const io = socketio(server);

const title = 'Buffer Buzzer'

let data = {
  users: new Set(),
  buzzes: new Set()
}

const getData = () => ({
  users: [...data.users],
  buzzes: [...data.buzzes].map(b => {
    const [ name, team ] = b.split('-')
    return { name, team }
  })
})

app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', (req, res) => res.render('index', { title }))
app.get('/host', (req, res) => res.render('host', Object.assign({ title }, getData())))

io.on('connection', (socket) => {

  socket.emit('connected', { sessionId: socket.id })

  socket.on('create room', async (options) => {
    const room = {
      id: generateId(),
      name: 'my room',
      isAdmin: true,
      ...options
    }
    await socket.join(room.id)
    socket.emit('room_created', room)
  })


  socket.on('join', async ({ room, username }) => {
    const user = {
      id: socket.id,
      room,
      username
    }
    data.users.add(user)
    await socket.join(room)
    socket.emit('room_joined', room)
    io.to(room).emit('connected_users', [...data.users].length)
    console.log(`${user.username} joined!`)
  })

  socket.on('disconnect', () => {
    const rooms = []
    data.users.forEach((user) => {
      console.log(user, socket.id)
      if (user.id === socket.id) {
        rooms.push(user.room)
        data.users.delete(user);
      }
    })
    console.log(rooms)
    rooms.forEach(room => {
      io.to(room).emit('connected_users', [...data.users].length)
    })
  })

  socket.on('buzz', (user) => {
    data.buzzes.add(`${user.name}-${user.team}`)
    io.emit('buzzes', [...data.buzzes])
    io.in(socket.rooms)
    console.log(`${user.name} buzzed in!`)
  })

  socket.on('clear', () => {
    data.buzzes = new Set()
    io.emit('buzzes', [...data.buzzes])
    console.log(`Clear buzzes`)
  })
})

server.listen(8090, () => console.log('Listening on 8090'))

function generateId () {
  return uniqid
    .process()
    .match(/.{1,4}(?=(.{4})+(?!.))|.{1,4}$/g)
    .join('-')
}