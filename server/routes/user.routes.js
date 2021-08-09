import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import authController from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/users')
      .get(userCtrl.list)
      .post(userCtrl.create)

router.route('/api/users/:userId')
       .get(authCtrl.requireSignin,userCtrl.read)
       .put(authCtrl.requireSignin,authCtrl.hasAuthorization,userCtrl.update)
       .delete(authCtrl.requireSignin,authCtrl.hasAuthorization,userCtrl.remove)


router.route('/api/users/photo/:userId')
      .get(userCtrl.photo,userCtrl.defaultphoto)

router.route('/api/photo/defaultphoto')
      .get(userCtrl.defaultphoto)

router.route('/api/follow/')
      .put(authCtrl.requireSignin,userCtrl.addFollowing,userCtrl.addFollower)

router.route('/api/unfollow')
      .put(authController.requireSignin,userCtrl.removeFollowing,userCtrl.removeFollower)

router.route('/api/findpeople/:userId')
      .get(authCtrl.requireSignin,userCtrl.findPeople)

router.param('userId',userCtrl.userByID)






export default router