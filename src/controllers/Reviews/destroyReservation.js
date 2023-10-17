const {Reviews}=require('../../db');

const destroyReview= async (id)=>{

    const deletedReview= await Reviews.destroy({where:{id}});

    return deletedReview;
}

module.exports= destroyReview;