import supertest, { Test } from 'supertest';
import TestAgent from 'supertest/lib/agent';
import insertUrlParams from 'inserturlparams';

import app from '@src/server';

import User, { IUser } from '@src/models/User';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { USER_NOT_FOUND_ERR } from '@src/services/UserService';

import Paths from 'spec/support/Paths';
import apiCb from 'spec/support/apiCb';
import { TApiCb } from 'spec/types/misc';

const mockify = require('@jazim/mock-mongoose');

const obtenirDonneesBidonUser = () => {
  return [
    {
      nom: 'Sean Maxwell',
      courriel: 'sean.maxwell@gmail.com',
      cree: new Date(Date.now()).toJSON() as unknown as Date,
      motDePasse: 'Jean-Luc Picard',
      _id:'66ffe9b9b12c8cc99db11153',
    },
    {
      nom: 'John Smith',
      courriel: 'john.smith@gmail.com',
      cree: new Date(Date.now()).toJSON() as unknown as Date,
      motDePasse: 'bob',
      _id:'66ffe9b9b12c8cc99db11155',
    },
    {
      nom: 'Gordan Freeman',
      courriel: 'gordan.freeman@gmail.com',
      cree: new Date(Date.now()).toJSON() as unknown as Date,
      motDePasse: 'cacaouette',
      _id:'66ffe9b9b12c8cc99db11150',
    },
  ];
} ;



// Tests
describe('UserRouter', () => {

  let agent: TestAgent<Test>;


  beforeAll(done => {
    agent = supertest.agent(app);
    done();
  });

  // cherche tout les users
  describe(`"GET:${Paths.Users.Get}"`, () => {

    // Setup API
    const api = (cb: TApiCb) => 
      agent
        .get(Paths.Users.Get)
        .end(apiCb(cb));

    // Reussite
    it('devrait retourner un objet JSON avec tous le utilisateurs et un code ' + 
    `de "${HttpStatusCodes.OK}" si la demande a reussi.`, (done) => {

      const data = obtenirDonneesBidonUser();
      mockify(User).toReturn(data, 'find');

      api(res => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        expect(res.body).toEqual({ users: data });
        const users = res.body.users as IUser[];
        expect(users.length).toBe(data.length);
        done();
      });
    });
  });

  // cherche un utilisateur par courriel
  describe(`"GET:${Paths.Users.GetOneCourriel}"`, () => {

    // Setup API
    
    const callApi = (courriel: string, cb: TApiCb) => 
      agent
        .get(insertUrlParams(Paths.Users.GetOneCourriel, { courriel }))
        .end(apiCb(cb));
    
    // Reussite
    it('devrait retourner un objet JSON avec l\'utilisateurs et un code ' + 
    `de "${HttpStatusCodes.OK}" si la demande a reussi.`, (done) => {

      const data = obtenirDonneesBidonUser()[0];
      mockify(User).toReturn(data, 'findOne');

      callApi(data.courriel, res => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        expect(res.body).toEqual({ user: data });
        done();
      });
    });
    // User non trouvee
    it('devrait retourner un objet JSON avec le message d\'erreur ' + 
      `"${USER_NOT_FOUND_ERR}" avec le code ` + 
      `"${HttpStatusCodes.NOT_FOUND}" si l'id n'a pas ete trouvee.`, done => {
        mockify(User).toReturn(null, 'findOne');
        callApi('66fff14fcbacf9a9f506abea', res => {
          expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
          expect(res.body.error).toBe(USER_NOT_FOUND_ERR);
          done();
        });
      });
  });

  // cherche un utilisateur par id
  describe(`"GET:${Paths.Users.GetOne}"`, () => {

    // Setup API
    
    const callApi = (id: string, cb: TApiCb) => 
      agent
        .get(insertUrlParams(Paths.Users.GetOne, { id }))
        .end(apiCb(cb));
    
    // Reussite
    it('devrait retourner un objet JSON avec l\'utilisateurs et un code ' + 
    `de "${HttpStatusCodes.OK}" si la demande a reussi.`, (done) => {

      const data = obtenirDonneesBidonUser()[0];
      mockify(User).toReturn(data, 'findOne');

      callApi(data._id, res => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        expect(res.body).toEqual({ user: data });
        done();
      });
    });
    // User non trouvee
    it('devrait retourner un objet JSON avec le message d\'erreur ' + 
      `"${USER_NOT_FOUND_ERR}" avec le code ` + 
      `"${HttpStatusCodes.NOT_FOUND}" si l'id n'a pas ete trouvee.`, done => {
        mockify(User).toReturn(null, 'findOne');
        callApi('66fff14fcbacf9a9f506abea', res => {
          expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
          expect(res.body.error).toBe(USER_NOT_FOUND_ERR);
          done();
        });
      });
  });
  // Test ajouter user
  describe(`"POST:${Paths.Users.Add}"`, () => {

    const ERROR_MSG = "utilisateur requis",
      DUMMY_USER = obtenirDonneesBidonUser()[0];

 
    const callApi = (user: IUser | null, cb: TApiCb) => 
      agent
        .post(Paths.Users.Add)
        .send({ user })
        .end(apiCb(cb));

    // Test ajouter user reussite
    it(`devrait retourner le code "${HttpStatusCodes.CREATED}" si la ` + 
    'demande a reussi.', (done) => {

      mockify(User).toReturn(DUMMY_USER, 'save');

      callApi(DUMMY_USER, res => {
        expect(res.status).toBe(HttpStatusCodes.CREATED);
        done();
      });
    });

    // user manquant
    it(`devrait retourner un objet JSON avec le message d'erreur "${ERROR_MSG}" ` + 
    `et un code "${HttpStatusCodes.BAD_REQUEST}" si l'utilisateur` + 
    ' etait manquant.', (done) => {
      // Call api
      callApi(null, res => {
        expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
        expect(res.body.error).toBe("utilisateur requis");
        done();
      });
    });
  });

  // mise a jour user
  describe(`"PUT:${Paths.Users.Update}"`, () => {

    const ERROR_MSG =  "utilisateur requis",
      DUMMY_USER = obtenirDonneesBidonUser()[0];


    const callApi = (user: IUser | null, cb: TApiCb) => 
      agent
        .put(Paths.Users.Update)
        .send({ user })
        .end(apiCb(cb));

    // Reussite
    it(`devrait retourner le code "${HttpStatusCodes.OK}" si la ` + 
    'requete a reussi.', (done) => {

      mockify(User)
          .toReturn(DUMMY_USER, 'findOne')
          .toReturn(DUMMY_USER, 'save');
      // Call api
      callApi(DUMMY_USER, res => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        done();
      });
    });

    // Parametres manquants
    it(`devrait retourner un objet JSON avec le message d'erreur "${ERROR_MSG}" ` +
    `avec le code "${HttpStatusCodes.BAD_REQUEST}" si l'utilisateur' ` + 
    'avait des parametres manquant.', (done) => {

      callApi(null, res => {
        expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
        expect(res.body.error).toBe(ERROR_MSG);
        done();
      });
    });

    // User non trouvee
    it('devrait retourner un objet JSON avec le message d\'erreur ' + 
    `"${USER_NOT_FOUND_ERR}" et le code ` + 
    `"${HttpStatusCodes.NOT_FOUND}" si l'id n'a pas ete trouvee.`, (done) => {
      mockify(User).toReturn(null, 'findOne');
      callApi(DUMMY_USER, res => {
        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(USER_NOT_FOUND_ERR);
        done();
      });
    });
  });

  // Supprimer user
  describe(`"DELETE:${Paths.Users.Delete}"`, () => {
    const DUMMY_USER = obtenirDonneesBidonUser()[0];

    const callApi = (id: string, cb: TApiCb) => 
      agent
        .delete(insertUrlParams(Paths.Users.Delete, { id }))
        .end(apiCb(cb));

    // Reussite
    it(`devrait retourner le code "${HttpStatusCodes.OK}" si la ` + 
    'requete a reussi.', (done) => {

      mockify(User)
          .toReturn(DUMMY_USER, 'findOne')
          .toReturn(DUMMY_USER, 'findOneAndRemove');

      callApi(DUMMY_USER._id, res => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        done();
      });
    });

    // User non trouvee
    it('devrait retourner un objet JSON avec le message d\'erreur ' + 
    `"${USER_NOT_FOUND_ERR}" avec le code ` + 
    `"${HttpStatusCodes.NOT_FOUND}" si l'id n'a pas ete trouvee.`, done => {
      mockify(User).toReturn(null, 'findOne');
      callApi('66fff14fcbacf9a9f506abea', res => {
        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(USER_NOT_FOUND_ERR);
        done();
      });
    });
  });
});
