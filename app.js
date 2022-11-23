import  express  from 'express';
import mongoose from 'mongoose';
import routers from './routes/user.router.js';
import cors from 'cors';
export const app=express();
///fix path not working 
import path from 'path';
import morgan from 'morgan';
import exp from 'constants';
const __dirname=path.resolve();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/css',express.static(path.join(__dirname,'node_modules','bootstrap','dist','css')));
//app.use(express.static('public'));
app.use(morgan("common"));


app.use('/api/foods',routers);

mongoose.connect('mongodb://localhost:27017/kfooddb', {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true

},(err)=>{
     if(!err){
        console.log("connected to db");
    }else{
        console.log(err);
    }
}); 

var PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('server is running on http://localhost:'+PORT);
});


