const models = require('../models');
const {Comment} = models;
const {Post} = models;

const create = async (req,res) =>{
    const data = req.body;
    const postId = req.params.postId;
    data.postId = postId;
    
    await Comment.create(data);
    return res.json("commented");
}

const getComment = async(req,res) => {
    const data = await Comment.findAll({include:[Post]});
    return res.json(data);
}

const remove = async (req,res) =>{
    await Comment.destroy({where:{id:req.query.id}});
    return res.json("comment deleted");
}
module.exports = {
    create,
    getComment,
    remove
}