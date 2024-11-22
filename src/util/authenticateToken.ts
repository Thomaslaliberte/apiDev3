import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { get } from 'http';
/**
 * Intergiciel pour authentifier le jeton de l'utilisateur
 *
 * @param {Request} req - La requête au serveur
 * @param {Response} res - La réponse du serveur
 * @param {NextFunction} next - La fonction a appeler pour continuer le processus.
 */
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  // Ne pas vérifier le token si l'url est celui de generatetoken
  const lastPartOfUrl = req.url.split('/').at(-1);
  if (
    lastPartOfUrl === 'Jeton' || lastPartOfUrl === 'jeton' || 
    lastPartOfUrl === 'docs' || lastPartOfUrl === 'Docs' ||
    lastPartOfUrl === 'creer'|| lastPartOfUrl === 'Creer'|| 
    ((lastPartOfUrl ==='monstres' || lastPartOfUrl ==='Monstres')&& req.method === 'GET') ) {
    next();
    return;
  }
  if (lastPartOfUrl === 'generatetoken') {
    next();
    return;
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(HttpStatusCodes.UNAUTHORIZED);

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    console.log(err);

    if (err) return res.sendStatus(HttpStatusCodes.FORBIDDEN);

    next();
  });
}

export default authenticateToken;