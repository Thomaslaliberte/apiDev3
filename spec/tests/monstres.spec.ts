import supertest, { Test } from 'supertest';
import TestAgent from 'supertest/lib/agent';
import insertUrlParams from 'inserturlparams';

import app from '@src/server';

import Monstre, { IMonstre } from '@src/models/Monstre';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { MONSTRE_NOT_FOUND_ERR } from '@src/services/MonstreService';

import Paths from 'spec/support/Paths';
import apiCb from 'spec/support/apiCb';
import { TApiCb } from 'spec/types/misc';

const mockify = require('@jazim/mock-mongoose');

const obtenirDonneesBidonMonstre = () => {
  return [
    {
      nom: 'Tarasque',
      CA: 25,
      armureNaturel: true,
      vie: 676,
      vitesse: 12,
      ajout: new Date(Date.now()).toJSON() as unknown as Date,
      stats: [30,11,30,3,11,11],
      puissance: 30,
      _id:'66ffe9b9b12c8cc99db11145',
    },
    {
        nom: 'Babouin',
        CA: 12,
        armureNaturel: false,
        vie: 3,
        vitesse: 9,
        ajout: new Date(Date.now()).toJSON() as unknown as Date,
        stats: [8,14,11,4,12,6],
        puissance: 0,
        _id:'66ffe9b9b12c8cc99db11190',
    },
    {
        nom: 'Kobold',
        CA: 12,
        armureNaturel: false,
        vie: 5,
        vitesse: 9,
        ajout: new Date(Date.now()).toJSON() as unknown as Date,
        stats: [7,15,9,8,7,8],
        puissance: 0.125,
        _id:'66ffe9b9b12c8cc99db33153',
    },
  ];
} ;



// Tests
describe('MonstreRouter', () => {

  let agent: TestAgent<Test>;


  beforeAll(done => {
    agent = supertest.agent(app);
    done();
  });

  // cherche tout les monstres
  describe(`"GET:${Paths.Monstres.Get}"`, () => {

    // Setup API
    const api = (cb: TApiCb) => 
      agent
        .get(Paths.Monstres.Get)
        .end(apiCb(cb));

    // Reussite
    it('devrait retourner un objet JSON avec tous les monstres et un code ' + 
    `de "${HttpStatusCodes.OK}" si la demande a reussi.`, (done) => {

      const data = obtenirDonneesBidonMonstre();
      mockify(Monstre).toReturn(data, 'find');

      api(res => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        expect(res.body).toEqual({ monstres: data });
        const monstres = res.body.monstres as IMonstre[];
        expect(monstres.length).toBe(data.length);
        done();
      });
    });
  });

  // cherche un monstre par nom
  describe(`"GET:${Paths.Monstres.GetOneNom}"`, () => {

    // Setup API
    
    const callApi = (nom: string, cb: TApiCb) => 
      agent
        .get(insertUrlParams(Paths.Monstres.GetOneNom, { nom }))
        .end(apiCb(cb));
    
    // Reussite
    it('devrait retourner uns objet JSON avec le monstre et un code ' + 
    `de "${HttpStatusCodes.OK}" si la demande a reussi.`, (done) => {

      const data = obtenirDonneesBidonMonstre()[0];
      mockify(Monstre).toReturn(data, 'findOne');

      callApi(data.nom, res => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        expect(res.body).toEqual({ monstre: data });
        done();
      });
    });
    // monstre non trouvee
    it('devrait retourner un objet JSON avec le message d\'erreur ' + 
      `"${MONSTRE_NOT_FOUND_ERR}" avec le code ` + 
      `"${HttpStatusCodes.NOT_FOUND}" si l'id n'a pas ete trouvee.`, done => {
        mockify(Monstre).toReturn(null, 'findOne');
        callApi('66fff14fcbacf9a9f506abea', res => {
          expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
          expect(res.body.error).toBe(MONSTRE_NOT_FOUND_ERR);
          done();
        });
      });
  });

  // cherche un monstre par id
  describe(`"GET:${Paths.Monstres.GetOne}"`, () => {

    // Setup API
    
    const callApi = (id: string, cb: TApiCb) => 
      agent
        .get(insertUrlParams(Paths.Monstres.GetOne, { id }))
        .end(apiCb(cb));
    
    // Reussite
    it('devrait retourner un objet JSON avec le monstre et un code ' + 
    `de "${HttpStatusCodes.OK}" si la demande a reussi.`, (done) => {

      const data = obtenirDonneesBidonMonstre()[0];
      mockify(Monstre).toReturn(data, 'findOne');

      callApi(data._id, res => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        expect(res.body).toEqual({ monstre: data });
        done();
      });
    });
    // monstre non trouvee
    it('devrait retourner un objet JSON avec le message d\'erreur ' + 
      `"${MONSTRE_NOT_FOUND_ERR}" avec le code ` + 
      `"${HttpStatusCodes.NOT_FOUND}" si l'id n'a pas ete trouvee.`, done => {
        mockify(Monstre).toReturn(null, 'findOne');
        callApi('66fff14fcbacf9a9f506abea', res => {
          expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
          expect(res.body.error).toBe(MONSTRE_NOT_FOUND_ERR);
          done();
        });
      });
  });
  // Test ajouter monstre
  describe(`"POST:${Paths.Monstres.Add}"`, () => {

    const ERROR_MSG = "monstre requis",
      DUMMY_MONSTRE = obtenirDonneesBidonMonstre()[0];

 
    const callApi = (monstre: IMonstre | null, cb: TApiCb) => 
      agent
        .post(Paths.Monstres.Add)
        .send({ monstre })
        .end(apiCb(cb));

    // Test ajouter monstre reussite
    it(`devrait retourner le code "${HttpStatusCodes.CREATED}" si la ` + 
    'demande a reussi.', (done) => {

      mockify(Monstre).toReturn(DUMMY_MONSTRE, 'save');

      callApi(DUMMY_MONSTRE, res => {
        expect(res.status).toBe(HttpStatusCodes.CREATED);
        done();
      });
    });

    // monstre manquant
    it(`devrait retourner un objet JSON avec le message d'erreur "${ERROR_MSG}" ` + 
    `et un code "${HttpStatusCodes.BAD_REQUEST}" si le monstre` + 
    ' etait manquant.', (done) => {
      // Call api
      callApi(null, res => {
        expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
        expect(res.body.error).toBe("monstre requis");
        done();
      });
    });
  });

  // mise a jour monstre
  describe(`"PUT:${Paths.Monstres.Update}"`, () => {

    const ERROR_MSG =  "monstre requis",
      DUMMY_MONSTRE = obtenirDonneesBidonMonstre()[0];


    const callApi = (monstre: IMonstre | null, cb: TApiCb) => 
      agent
        .put(Paths.Monstres.Update)
        .send({ monstre })
        .end(apiCb(cb));

    // Reussite
    it(`devrait retourner le code "${HttpStatusCodes.OK}" si la ` + 
    'requete a reussi.', (done) => {

      mockify(Monstre)
          .toReturn(DUMMY_MONSTRE, 'findOne')
          .toReturn(DUMMY_MONSTRE, 'save');
      // Call api
      callApi(DUMMY_MONSTRE, res => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        done();
      });
    });

    // Parametres manquants
    it(`devrait retourner un objet JSON avec le message d'erreur "${ERROR_MSG}" ` +
    `avec le code "${HttpStatusCodes.BAD_REQUEST}" si le monstre' ` + 
    'avait des parametres manquant.', (done) => {

      callApi(null, res => {
        expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
        expect(res.body.error).toBe(ERROR_MSG);
        done();
      });
    });

    // Monstre non trouvee
    it('devrait retourner un objet JSON avec le message d\'erreur ' + 
    `"${MONSTRE_NOT_FOUND_ERR}" et le code ` + 
    `"${HttpStatusCodes.NOT_FOUND}" si l'id n'a pas ete trouvee.`, (done) => {
      mockify(Monstre).toReturn(null, 'findOne');
      callApi(DUMMY_MONSTRE, res => {
        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(MONSTRE_NOT_FOUND_ERR);
        done();
      });
    });
  });

  // Supprimer monstre
  describe(`"DELETE:${Paths.Monstres.Delete}"`, () => {
    const DUMMY_MONSTRE = obtenirDonneesBidonMonstre()[0];

    const callApi = (id: string, cb: TApiCb) => 
      agent
        .delete(insertUrlParams(Paths.Monstres.Delete, { id }))
        .end(apiCb(cb));

    // Reussite
    it(`devrait retourner le code "${HttpStatusCodes.OK}" si la ` + 
    'requete a reussi.', (done) => {

      mockify(Monstre)
          .toReturn(DUMMY_MONSTRE, 'findOne')
          .toReturn(DUMMY_MONSTRE, 'findOneAndRemove');

      callApi(DUMMY_MONSTRE._id, res => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        done();
      });
    });

    // Monstre non trouvee
    it('devrait retourner un objet JSON avec le message d\'erreur ' + 
    `"${MONSTRE_NOT_FOUND_ERR}" avec le code ` + 
    `"${HttpStatusCodes.NOT_FOUND}" si l'id n'a pas ete trouvee.`, done => {
      mockify(Monstre).toReturn(null, 'findOne');
      callApi('66fff14fcbacf9a9f506abea', res => {
        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(MONSTRE_NOT_FOUND_ERR);
        done();
      });
    });
  });
});
