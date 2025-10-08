// GROQ query for services data
export const servicesQuery = `*[_type == "service" && available == true] | order(featured desc, order asc, _createdAt asc) {
  title,
  description,
  iconName,
  features,
  technologies,
  pricing,
  deliveryTime,
  available,
  featured,
  order
}`
