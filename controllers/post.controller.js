const models = require('../models');
const {Post} = models;

const addPost = async (req,res) =>{
    await Post.create(req.body);
    return res.json('new post added');
}

const getAllPost = async (req,res) =>{
    const data = await Post.findAll();
    if(data.length >= 1) return res.json(data); 
     return res.json("no post yet");
}

const remove = async (req,res) =>{
    const del = await Post.destroy({where:{id:req.query.id}});
    if(del) return res.json('post deleted');
    return res.json('not deleted');
}

const update = async (req,res) =>{
   const data = await Post.update(
        {
            title : req.body.title,
            text : req.body.text,
            photo : req.body.photo,
            video : req.body.video
        },
        {where:{id:req.query.id}}
        );
        if(data[0]) return res.json("post updated successfully");
        return res.json('fail to updated try again');
}

module.exports = {
    addPost,
    getAllPost,
    remove,
    update
}