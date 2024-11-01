/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/',
    GetOne:'/id/:id',
    GetOneCourriel:'/courriel/:courriel',
    Add: '/creer',
    Update: '/',
    Delete: '/:id',
  },
  GenerateToken: {
    Base: '/jeton',
    Post: '/',
  },
  Monstres:{
    Base: '/monstres',
    Get: '/',
    GetOne: '/id/:id',
    GetOneNom: '/nom/:nom',
    GetOnePuissance:'/puissance/:puissance',
    Add: '/',
    Update: '/',
    Delete: '/:id'
  }
} as const;
