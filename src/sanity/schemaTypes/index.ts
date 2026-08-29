import { collection } from "./collection";
import { journalPost } from "./journalPost";
import { fashionImage, localizedString } from "./objects";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  localizedString,
  fashionImage,
  siteSettings,
  collection,
  journalPost,
];
