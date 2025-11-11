// GROQ query for expertise/skills data
export const expertiseQuery = `*[_type == "expertise"] | order(order asc, _createdAt asc) {
  name,
  iconName,
  customIconName,
  color,
  category,
  categories,
  proficiencyLevel,
  yearsOfExperience,
  description,
  order,
  featured
}`
