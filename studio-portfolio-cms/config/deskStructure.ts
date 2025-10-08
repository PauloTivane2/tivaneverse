import { StructureBuilder } from 'sanity/desk'
import {
  UserIcon,
  ProjectsIcon,
  CogIcon,
  BulbOutlineIcon,
  HeartIcon,
  DocumentTextIcon,
  HomeIcon,
} from '@sanity/icons'

export const deskStructure = (S: StructureBuilder) =>
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

      S.divider(),

      // Blog Posts
      S.listItem()
        .title('Blog Posts')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Blog Management')
            .items([
              S.listItem()
                .title('All Posts')
                .child(
                  S.documentTypeList('blogPost')
                    .title('All Blog Posts')
                    .filter('_type == "blogPost"')
                ),
              S.listItem()
                .title('Published Posts')
                .child(
                  S.documentTypeList('blogPost')
                    .title('Published Posts')
                    .filter('_type == "blogPost" && published == true')
                ),
              S.listItem()
                .title('Draft Posts')
                .child(
                  S.documentTypeList('blogPost')
                    .title('Draft Posts')
                    .filter('_type == "blogPost" && published == false')
                ),
              S.listItem()
                .title('Featured Posts')
                .child(
                  S.documentTypeList('blogPost')
                    .title('Featured Posts')
                    .filter('_type == "blogPost" && featured == true')
                ),
            ])
        ),

      // Testimonials
      S.listItem()
        .title('Testimonials')
        .icon(HeartIcon)
        .child(
          S.list()
            .title('Testimonial Management')
            .items([
              S.listItem()
                .title('All Testimonials')
                .child(
                  S.documentTypeList('testimonial')
                    .title('All Testimonials')
                    .filter('_type == "testimonial"')
                ),
              S.listItem()
                .title('Published Testimonials')
                .child(
                  S.documentTypeList('testimonial')
                    .title('Published Testimonials')
                    .filter('_type == "testimonial" && published == true')
                ),
              S.listItem()
                .title('Featured Testimonials')
                .child(
                  S.documentTypeList('testimonial')
                    .title('Featured Testimonials')
                    .filter('_type == "testimonial" && featured == true')
                ),
              S.listItem()
                .title('5-Star Reviews')
                .child(
                  S.documentTypeList('testimonial')
                    .title('5-Star Reviews')
                    .filter('_type == "testimonial" && rating == 5')
                ),
            ])
        ),
    ])
