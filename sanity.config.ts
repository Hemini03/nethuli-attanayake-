import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "./src/sanity/env";

const projectId = sanityProjectId || "placeholder";

export default defineConfig({
  name: "nethuli-attanayake",
  title: "Nethuli Attanayake",
  projectId,
  dataset: sanityDataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool({ defaultApiVersion: sanityApiVersion })],
  schema: {
    types: schemaTypes,
  },
});
