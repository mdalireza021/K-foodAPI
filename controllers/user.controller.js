import idAutoIncrement from "id-auto-increment";
import { foodModel } from "../models/food.model.js";
import multer from "multer";
import path from "path";
const __dirname=path.resolve();
export const homepage=(req,res)=>{

    res.sendFile(__dirname+"/views/index.html");

};
export const getAllFoods=(req,res)=>{
    foodModel.find((err,val)=>{
        if(!err){
            res.json(val);
        } else{
            console.log(err);
        }});
};

export const getOneFood=(req,res)=>{
    const fetchId=req.params.id;
    foodModel.find(({id:fetchId}),(err,val)=>{
        if(!err){
            res.json(val);
        }else{
            console.log(err);
        }
    });
    
};

///multer
const UPLOAD_FOLDER="./uploads/";

const storage=multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,UPLOAD_FOLDER);
    },
    filename: (req,file,cb)=>{

        const fileExt=path.extname(file.originalname);
        const fileName=file.originalname.replace(fileExt,"").toLowerCase().split(" ").join("-")+"-"+Date.now();
        cb(null,fileName+fileExt);

    }
})

export var upload =multer({
    storage: storage,
    limits:{ fileSize:5000000},
    fileFilter:(req,file,cb)=>{

        if(file.fieldname==="image")
        {
            if(file.mimetype==="image/png" || file.mimetype==="image/jpg" || file.mimetype==="image/jpeg" )
            {
                cb(null,true);
            }
        }
        else
        {
            cb(new Error('there was an unknown error!'));
        }
    }
});

 export const addFood=async (req,res)=>{
    try{
        
            const data=new foodModel({
                id:await idAutoIncrement(),
                
                food_name:req.body.food_name,
                image:
                {
                    data:req.file.filename,
                    contentType: 'image/png'
                },
                description:req.body.description,
                details:req.body.details
        });    
    const val=await data.save();
    res.json(val);
    }
    catch(err){
        console.log(err);
        res.status(500);
    }  

};
