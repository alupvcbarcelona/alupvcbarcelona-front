export const sold_user_content = ({user, packs}) => {
  const body = {
    avatar: user.avatar,
    title: user.name,
    description: `Descubre todos los packs disponibles de tu cliente ${user.name}.`,
    description_: `En caso de querer contactarle, puedes hacerlo vía:`,
    email: user.email,
    phone: user.phone,
    country: user.country,
    city: user.city,
    helmet: {
      title: `Packeo | ${user.name}`,
      description: {
        name: 'description',
        content: `Descubre los packs que están disponibles en el restaurante ${user.name}.`
      },
      keywords: {
        name: 'keywords',
        content: packs.map((element) => element.idPack.name).join(', ')
      }
    }
  }
  return {body}
}
