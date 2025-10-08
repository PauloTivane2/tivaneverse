// GROQ query for expertise/skills data
export const expertiseQuery = `*[_type == "expertise"] | order(order asc, _createdAt asc) {
  name,
  iconName,
  color,
  category,
  proficiencyLevel,
  yearsOfExperience,
  description,
  order,
  featured
}`
