import { defineType, defineField } from "sanity";

export const fashionImage = defineType({
  name: "fashionImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Upload", type: "image" }),
    defineField({ name: "url", title: "External URL", type: "url" }),
    defineField({ name: "altFr", title: "Alt FR", type: "string" }),
    defineField({ name: "altEn", title: "Alt EN", type: "string" }),
    defineField({ name: "photographer", type: "string" }),
    defineField({ name: "photographerUrl", type: "url" }),
    defineField({ name: "width", type: "number", initialValue: 1600 }),
    defineField({ name: "height", type: "number", initialValue: 2133 }),
  ],
});

export const localizedString = defineType({
  name: "localizedString",
  title: "FR / EN",
  type: "object",
  fields: [
    defineField({ name: "fr", type: "text", rows: 2 }),
    defineField({ name: "en", type: "text", rows: 2 }),
  ],
});
