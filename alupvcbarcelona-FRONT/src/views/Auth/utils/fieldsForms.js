export const fieldsLogin = {
  body: {
    title: 'Bienvenid@',
    description:
      '¡Qué alegría tenerte de vuelta! Tu presencia es muy importante paranosotros.'
  },
  form: [
    {
      name: 'email',
      label: 'Correo Electrónico',
      type: 'email',
      required: true,
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      required: true,
      minLength: 8
    }
  ],
  button: {
    text:'Iniciar sesión'
  },
  helmet: {
    title: 'Packeo | Login',
    description: {
      name: 'description',
      content: 'Inicia sesión en Packeo'
    },
    keywords: {
      name: 'keywords',
      content:
        'login, Packeo, ahorro, packs, restauración, cafeterías, té, bebidas, descuentos, lealtad de clientes, marketing, negocios, fidelizar clientes'
    }
  }
}

export const fieldsRegister = {
  body: {
    title: 'Registrate',
    description:
      '¡Estás a un paso de disfrutar grandes beneficios en tus establecimientos favoritos! Completa tu registro y comienza a vivir la experiencia.'
  },
  form: [
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    {
      name: 'email',
      label: 'Correo Electrónico',
      type: 'email',
      required: true,
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    },
    { name: 'phone', label: 'Teléfono', type: 'tel', required: true },
    { name: 'country', label: 'Paise', type: 'country', required: true },
    { name: 'city', label: 'Ciudad', type: 'city', required: true },
    { name: 'postal_code', label: 'Codigo Postal', type: 'text', required: true },
    { name: 'password', label: 'Contraseña', type: 'password', required: true }
  ],
  button: {
    text:'Registrate'
  },
  helmet: {
    title: 'Packeo | Registro',
    description: {
      name: 'description',
      content: 'Registrate en Packeo'
    },
    keywords: {
      name: 'keywords',
      content:
        'registro, Packeo, ahorro, packs, restauración, cafeterías, té, bebidas, descuentos, lealtad de clientes, marketing, negocios, fidelizar clientes'
    }
  }
}

export const fieldsForgot = {
  body: {
    title: 'Recuperación de usuario',
    description:
      'Estás a un paso de restablecer tu contraseña, por favor sigue las instrucciones.'
  },
  form: [
    {
      name: 'email',
      label: 'Correo Electrónico',
      type: 'email',
      required: true,
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }
  ],
  button: {
    text:'Recuperar contraseña'
  },
  helmet: {
    title: 'Packeo | Recuperar contraseña',
    description: {
      name: 'description',
      content: 'Recupera usuario en Packeo'
    },
    keywords: {
      name: 'keywords',
      content:
        'recuperar contraseña, Packeo, ahorro, packs, restauración, cafeterías, té, bebidas, descuentos, lealtad de clientes, marketing, negocios, fidelizar clientes'
    }
  }
}

export const fieldsPassword = {
  body: {
    title: 'Recupera tu contraseña',
    description:
      'Restablece tu contraseña, ya falta muy poco para seguir disfrutando de los beneficios de PACKEO.'
  },
  form: [
    {
      name: 'password',
      label: 'Nueva Contraseña',
      type: 'password',
      required: true,
      validate: (value) => value.length >= 8
    }
  ],
  button: {
    text:'Guardar contraseña'
  },
  helmet: {
    title: 'Packeo | Nueva contraseña',
    description: {
      name: 'description',
      content: 'Nueva contraseña en Packeo'
    },
    keywords: {
      name: 'keywords',
      content:
        'Nueva contraseña, Packeo, ahorro, packs, restauración, cafeterías, té, bebidas, descuentos, lealtad de clientes, marketing, negocios, fidelizar clientes'
    }
  }
}

export const fieldsVerifyCode = {
  body: {
    title: 'Validación de cuenta',
    description:
      'Hemos enviado un codigo de seguridad a tu bandeja de email, por favor introducelo en el campo correspondiente. En caso de no herblo recibido, revisa la bandeja de spam.'
  },
  form: [
    {
      name: 'verificationCode',
      label: 'Código de Verificación',
      type: 'text',
      required: true,
      validate: (value) => /^[0-9]{8}$/.test(value)
    }
  ],
  button: {
    text:'Validar código'
  },
  helmet: {
    title: 'Packeo | Validación de token',
    description: {
      name: 'description',
      content: 'Validación de cuenta en Packeo'
    },
    keywords: {
      name: 'keywords',
      content:
        'validación de token, Packeo, ahorro, packs, restauración, cafeterías, té, bebidas, descuentos, lealtad de clientes, marketing, negocios, fidelizar clientes'
    }
  }
}
