import mongoose from "mongoose";


///schema 
const schema=mongoose.Schema(
{
    id:
    {
        type:String,
        required:true

    },
    food_name:

    {
        type:String,
        required:true

    },
    image:
    {
        data:Buffer,
        contentType:String,
    },
    description:

    {

        type:String,
        required:true
    },

    details:
    {
        type:String,
        required:true

    }
    
});
export const foodModel=mongoose.model("food_lists",schema);