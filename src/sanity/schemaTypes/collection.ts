import { defineField, defineType } from "sanity";

export const collection = defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", description: "French title, kept in both languages" }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({ name: "season", type: "string" }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "excerpt", type: "localizedString" }),
    defineField({ name: "story", type: "localizedString" }),
    defineField({ name: "cover", type: "fashionImage" }),
    defineField({
      name: "looks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", type: "string" },
            { name: "title", type: "localizedString" },
            { name: "image", type: "fashionImage" },
          ],
          preview: {
            select: { title: "number", subtitle: "title.fr" },
          },
        },
      ],
    }),
    defineField({
      name: "process",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "kind",
              type: "string",
              options: { list: ["sketch", "fabric", "toile"] },
            },
            { name: "title", type: "localizedString" },
            { name: "caption", type: "localizedString" },
            { name: "image", type: "fashionImage" },
          ],
          preview: {
            select: { title: "kind", subtitle: "title.fr" },
          },
        },
      ],
    }),
  ],
});
