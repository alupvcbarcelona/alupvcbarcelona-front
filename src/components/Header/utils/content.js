export const optionsNavigate = (user, auth) => {  
  if (!auth) {
    return [
      {
        text: 'home',
        url: '/',
        icon: home
      },
      {
        text: 'Colaboradores',
        url: '/colaboradores',
        icon: partner
      },
      {
        text: 'login',
        url: '/login',
        icon: login
      },
      {
        text: 'registro',
        url: '/registro',
        icon: register
      }
    ]
  }
  if (auth && user.roles === 'user') {
    return [
      {
        text: 'home',
        url: '../',
        icon: home
      },
      {
        text: 'Colaboradores',
        url: '/colaboradores',
        icon: partner
      },
      {
        text: 'Perfil',
        url: '/perfil',
        icon: profile
      },
      {
        text: 'Mis Packs',
        url: '/packs',
        icon: box
      }
    ]
  }
  if (auth && user.roles === 'partner') {
    return [
      {
        text: 'home',
        url: '../',
        icon: home
      },
      {
        text: 'Colaboradores',
        url: '/colaboradores',
        icon: partner
      },
      {
        text: 'Perfil',
        url: '/perfil',
        icon: profile
      },
      {
        text: 'Mis Packs',
        url: '/packs',
        icon: box
      },
      {
        text: 'Negocio',
        url: '/negocio',
        icon: bussiness
      }
    ]
  }
}

export const optionsNavigateMobile = (user, auth) => {
  if (!auth) {
    return [
      {
        text: 'home',
        url: '../',
        icon: home
      },
      {
        text: 'Colaboradores',
        url: '/colaboradores',
        icon: partner
      },
      {
        text: 'login',
        url: '/login',
        icon: login
      },
      {
        text: 'registro',
        url: '/registro',
        icon: register
      }
    ]
  }
  if (auth && user.roles === 'user') {
    return [
      {
        text: 'home',
        url: '../',
        icon: home
      },
      {
        text: 'Colaboradores',
        url: '/colaboradores',
        icon: partner
      },
      {
        text: 'Perfil',
        url: '/perfil',
        icon: profile
      },
      {
        text: 'Mis Packs',
        url: '/packs',
        icon: box
      }
    ]
  }
  if (auth && user.roles === 'partner') {
    return [
      {
        text: 'home',
        url: '../',
        icon: home
      },
      {
        text: 'Colaboradores',
        url: '/colaboradores',
        icon: partner
      },
      {
        text: 'Perfil',
        url: '/perfil',
        icon: profile
      },
      {
        text: 'Mis Packs',
        url: '/packs',
        icon: box
      },
      {
        text: 'Negocio',
        url: '/negocio',
        icon: bussiness
      }
    ]
  }
}
