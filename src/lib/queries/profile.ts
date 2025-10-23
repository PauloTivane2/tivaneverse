// GROQ query for profile data
export const profileQuery = `*[_type == "profile"][0]{
  name,
  title,
  tagline,
  bio,
  image,
  email,
  phone,
  location {
    city,
    mapLink
  },
  resume,
  social,
  skills,
  availability
}`
