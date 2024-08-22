import  User  from './models/User'
import  Album  from './models/album'

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  User.sync({ alter: isDev }),
  Album.sync({ alter: isDev })

}
export default dbInit 