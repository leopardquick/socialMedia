import express from 'express'
import authController from '../controllers/auth.controller'
import authCtrl from '../controllers/auth.controller'
import postCtrl from '../controllers/post.controller'
import userController from '../controllers/user.controller'

const router = express.Router()

router.route('/api/posts/feed/:userId')
        .get(authCtrl.requireSignin,postCtrl.listNewsFeed)

router.route('/api/posts/new/:userId')
        .post(authController.requireSignin,postCtrl.create)

router.route('/api/posts/photo/:postId')
        .get(postCtrl.photo)

router.route('/api/post/byUser/:userId')
      .get(authCtrl.requireSignin,postCtrl.postByUser)

router.route('/api/post/like')
      .put(authCtrl.requireSignin,postCtrl.likes)

router.route('/api/post/unlike')
       .put(authCtrl.requireSignin,postCtrl.unlikes)

router.route('/api/post/comment')
      .post(authCtrl.requireSignin,postCtrl.creatComments)

router.route('/api/post/remove/:postId')
      .delete(authCtrl.requireSignin,postCtrl.isThePoster,postCtrl.remove)


router.param('postId',postCtrl.postById)
router.param('userId',userController.userByID)

export default router