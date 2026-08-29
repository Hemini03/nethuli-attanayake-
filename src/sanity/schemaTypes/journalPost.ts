import { defineField, defineType } from "sanity";

export const journalPost = defineType({
  name: "journalPost",
  title: "Journal",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localizedString" }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title.fr" },
    }),
    defineField({ name: "date", type: "date" }),
    defineField({ name: "excerpt", type: "localizedString" }),
    defineField({ name: "body", type: "localizedString" }),
    defineField({ name: "cover", type: "fashionImage" }),
  ],
  preview: {
    select: { title: "title.fr", subtitle: "date" },
  },
});
