const useFilter = (searchTerm, arrayUsers) => {
  const filteredResults = arrayUsers.filter((element) => {
    const nameMatch = element.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const cityMatch = element.city
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const countryMatch = element.country
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const postalCode = element.postal_code
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return nameMatch || cityMatch || countryMatch || postalCode
  })
  return filteredResults
}

export default useFilter
