import { StudioApp } from "./studio-app";
import { hasSanityConfig } from "@/sanity/env";

export const dynamic = "force-static";

export default function StudioPage() {
  if (!hasSanityConfig) {
    return (
      <main
        style={{
          fontFamily: "Georgia, serif",
          padding: "4rem 2rem",
          background: "#F6F1EA",
          minHeight: "100vh",
        }}
      >
        <p style={{ letterSpacing: "0.28em", textTransform: "uppercase", fontSize: 11 }}>
          Sanity
        </p>
        <h1 style={{ fontStyle: "italic", fontWeight: 400 }}>
          Connect a project to open Studio
        </h1>
        <p>
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code> to <code>.env.local</code>, then restart
          the app. The public site already runs on fallback lookbook content without Sanity.
        </p>
      </main>
    );
  }

  return <StudioApp />;
}
