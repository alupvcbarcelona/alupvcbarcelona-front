export const bussiness_content = {
  body: {
    title: 'Gestión de negocios | Administra tus packs fácilmente',
    description:
      'Accede a la sección de negocios para gestionar tus packs, personalizarlos y aumentar la fidelización de tus clientes.',
    description_:
      'Optimiza la experiencia de tus clientes gestionando descuentos y promociones desde un solo lugar.',
    helmet: {
      title: 'Packeo | Gestión de negocios y fidelización de clientes',
      description: {
        name: 'description',
        content:
          'Packeo: Administra tus negocios con facilidad. Personaliza packs, gestiona promociones y mejora la fidelización de clientes en sectores como restaurantes, cafeterías y más.'
      },
      keywords: {
        name: 'keywords',
        content:
          'Packeo, gestión de negocios, fidelización de clientes, packs promocionales, marketing para negocios, restaurantes, cafeterías, bebidas, descuentos exclusivos, lealtad de clientes, promoción, ahorro, gestión empresarial, aumento de ventas'
      }
    }
  },
  form_redeem: [
    {
      name: 'email',
      label: 'Correo Electrónico:',
      type: 'email',
      required: true,
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      placeholder: 'fran@packeo.es'
    },
    {
      name: 'quantity',
      label: 'Cantidad:',
      type: 'number',
      required: true,
      placeholder: '1 unidad'
    }
  ],
  button_redeem: {
    text: 'Canjear'
  },
  form_assign: [
    {
      name: 'email',
      label: 'Correo Electrónico:',
      type: 'email',
      required: true,
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      placeholder: 'fran@packeo.es'
    }
  ],
  button_assign: {
    text: 'Asignar pack'
  },
  form_create: [
    {
      name: 'name',
      label: 'Nombre nuevo pack:',
      type: 'text',
      required: true,
      placeholder: 'Cafe solo 10 x 12'
    },
    {
      name: 'description',
      label: 'Descripción corta:',
      type: 'text',
      required: true,
      placeholder: 'Pack ahorra'
    },
    {
      name: 'initPrice',
      label: 'Precio total:',
      type: 'number',
      required: true,
      placeholder: '12€'
    }
    ,
    {
      name: 'discount',
      label: 'Descuento en caso de aplicar, *opcional:',
      type: 'number',
      required: true,
      placeholder: '10%'
    }
    ,
    {
      name: 'items_included',
      label: 'Cantidad de productos *sin extras:',
      type: 'number',
      required: true,
      placeholder: '10'
    }
    ,
    {
      name: 'bonus_items',
      label: 'Cantidad de productos extras en caso de aplicar, *opcional:',
      type: 'number',
      required: true,
      placeholder: '0'
    }
  ],
  button_create: {
    text: 'Crear'
  }
}