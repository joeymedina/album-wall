import  User  from './models/User'
import  Album  from './models/album'
import  Collection  from './models/album'


const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  User.sync({ alter: true }),
  Album.sync({ alter: true })
  Collection.sync({ alter: true })

}
export default dbInit 