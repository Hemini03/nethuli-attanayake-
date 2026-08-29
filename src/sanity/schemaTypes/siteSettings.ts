import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site",
  type: "document",
  fields: [
    defineField({ name: "designer", type: "string", initialValue: "Nethuli Attanayake" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "instagram", type: "string" }),
    defineField({ name: "instagramUrl", type: "url" }),
    defineField({ name: "location", type: "localizedString" }),
    defineField({ name: "address", type: "localizedString" }),
    defineField({ name: "manifesto", type: "localizedString" }),
    defineField({ name: "availability", type: "localizedString" }),
    defineField({ name: "bio", type: "localizedString" }),
    defineField({ name: "portrait", type: "fashionImage" }),
    defineField({ name: "heroCollectionSlug", type: "string" }),
    defineField({
      name: "education",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "year", type: "string" },
            { name: "school", type: "localizedString" },
            { name: "detail", type: "localizedString" },
          ],
        },
      ],
    }),
    defineField({
      name: "skills",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
  ],
  preview: {
    select: { title: "designer" },
  },
});
