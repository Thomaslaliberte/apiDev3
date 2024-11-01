import { Router, Request, Response, NextFunction } from 'express';
import jetValidator from 'jet-validator';


import Paths from '../common/Paths';
import UserRoutes from './UserRoutes';
import User from '@src/models/User';
import MonstreRoutes from './MonstreRoute';
import Monstre from '@src/models/Monstre';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import JetonRoutes from './JetonRoutes';

// **** Variables **** //

const apiRouter = Router(),
validate = jetValidator();

function validateMonstre(req: Request, res: Response, next: NextFunction) {
    if (req.body === null) {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .send({ error: 'monstre requis' })
        .end();
      return;
    }
  
    if (req.body.monstre === null) {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .send({ error: 'monstre requis' })
        .end();
      return;
    }
    const nouveauMonstre = new Monstre(req.body.monstre);
    const error = nouveauMonstre.validateSync();
    if (error !== null && error !== undefined) {
      res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
    } else {
      next();
    }
  }
  function validateUser(req: Request, res: Response, next: NextFunction) {
    if (req.body === null) {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .send({ error: 'utilisateur requis' })
        .end();
      return;
    }
  
    if (req.body.user === null) {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .send({ error: 'utilisateur requis' })
        .end();
      return;
    }
    const nouvelUser = new User(req.body.user);
    const error = nouvelUser.validateSync();
    if (error !== null && error !== undefined) {
      res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
    } else {
      next();
    }
  }
// ** Add UserRouter ** //

// Init router
const userRouter = Router();
const monstreRouter = Router();

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.get(Paths.Users.GetOne, UserRoutes.getOne);
userRouter.get(Paths.Users.GetOneCourriel, UserRoutes.getOneCourriel);
userRouter.post(Paths.Users.Add, validateUser, UserRoutes.add);
userRouter.put(Paths.Users.Update, validateUser, UserRoutes.update);
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'string', 'params']),
  UserRoutes.delete
);

monstreRouter.get(Paths.Monstres.Get, MonstreRoutes.getAll);
monstreRouter.get(Paths.Monstres.GetOne, MonstreRoutes.getOne);
monstreRouter.get(Paths.Monstres.GetOneNom, MonstreRoutes.getOneNom);
monstreRouter.get(Paths.Monstres.GetOnePuissance, MonstreRoutes.getOnePuissance);
monstreRouter.post(Paths.Monstres.Add, validateMonstre, MonstreRoutes.add);
monstreRouter.put(Paths.Monstres.Update, validateMonstre, MonstreRoutes.update);
monstreRouter.delete(
  Paths.Monstres.Delete,
  validate(['id', 'string', 'params']),
  MonstreRoutes.delete
);
// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);

apiRouter.use(Paths.Monstres.Base, monstreRouter);

// ** Add JetonRouter ** //

// Init Router
const tokenRouter = Router();

// Generate token
tokenRouter.post(Paths.GenerateToken.Post, JetonRoutes.generateToken);

// Add JetonRouter
apiRouter.use(Paths.GenerateToken.Base, tokenRouter);
// **** Export default **** //

export default apiRouter;
