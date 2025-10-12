import {
  UserIcon,
  ProjectsIcon,
  CogIcon,
  BulbOutlineIcon,
  HeartIcon,
  DocumentTextIcon,
  HomeIcon,
  SparklesIcon,
} from '@sanity/icons'

export const deskStructure = (S: any) =>
  S.list()
    .title('Portfolio CMS')
    .items([
      // Profile Section
      S.listItem()
        .title('Profile')
        .icon(UserIcon)
        .child(
          S.document()
            .schemaType('profile')
            .documentId('profile')
            .title('My Profile')
        ),

      // Site Settings
      S.listItem()
        .title('Site Settings')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Configuration')
        ),

      // Visual Effects
      S.listItem()
        .title('Visual Effects')
        .icon(SparklesIcon)
        .child(
          S.document()
            .schemaType('visualEffects')
            .documentId('visualEffects')
            .title('Visual Effects Configuration')
        ),

      S.divider(),

      // Projects
      S.listItem()
        .title('Projects')
        .icon(ProjectsIcon)
        .child(
          S.documentTypeList('project')
            .title('All Projects')
            .filter('_type == "project"')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('project')
            )
        ),

      // Services
      S.listItem()
        .title('Services')
        .icon(CogIcon)
        .child(
          S.documentTypeList('service')
            .title('All Services')
            .filter('_type == "service"')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('service')
            )
        ),

      // Expertise
      S.listItem()
        .title('Expertise & Skills')
        .icon(BulbOutlineIcon)
        .child(
          S.documentTypeList('expertise')
            .title('All Skills')
            .filter('_type == "expertise"')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('expertise')
            )
        ),

    ])
