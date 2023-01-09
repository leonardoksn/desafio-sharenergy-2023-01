import { app } from './App';
import mongoose from 'mongoose';

const PORT = process.env.PORT
const OWNER_DB = process.env.OWNER_DB
const PASSWORD_DB = encodeURIComponent(process.env.PASSWORD_DB as string)
mongoose.set("strictQuery", true);


mongoose.connect(`mongodb+srv://${OWNER_DB}:${PASSWORD_DB}@apicluster.chd1quy.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    app.listen(PORT, () => {
        console.log(`⚡Server running in http://127.0.0.1:${PORT}`)
    
    })
    
    
})
.catch()

