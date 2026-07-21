export const pack_content = (partner, packs) => {
  console.log(partner);
  
  const body = {
    avatar: partner.avatar,
    title: partner.name,
    description: 'Descubre todos los packs disponibles en un solo lugar.',
    description_: `En caso de querer realizar una reserva, puedes contactar con "${partner.name}":`,
    email: partner.email,
    phone: partner.phone,
    country: partner.country,
    city: partner.city,
    postalCode: partner.postal_code,
    helmet: {
      title: `Packeo | ${partner.name}`,
      description: {
        name: 'description',
        content: `Descubre los packs que están disponibles en el restaurante ${partner.name}.`
      },
      keywords: {
        name: 'keywords',
        content: packs.map((element) => element.name).join(', ')
      }
    }
  }
  return { body }
}
