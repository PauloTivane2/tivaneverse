// GROQ query for projects data
export const projectsQuery = `*[_type == "project"] | order(featured desc, order asc, _createdAt desc) {
  title,
  slug,
  description,
  longDescription,
  image,
  gallery,
  technologies,
  category,
  liveUrl,
  githubUrl,
  featured,
  status,
  startDate,
  endDate,
  client,
  order
}`
