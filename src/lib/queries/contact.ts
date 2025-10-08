// GROQ query for site settings (used in contact section)
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  description,
  contactInfo,
  socialMedia,
  analytics
}`

// GROQ query for profile contact info (alternative)
export const contactInfoQuery = `*[_type == "profile"][0]{
  name,
  email,
  phone,
  location,
  social
}`
