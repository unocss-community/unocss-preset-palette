import { useColorMode } from "@vueuse/core";
import { createApp } from "vue";
import "uno.css";

type ThemePack = "gallery" | "noir" | "cafe" | "harbor";

const THEMES: { id: ThemePack; label: string; swatch: string }[] = [
  { id: "gallery", label: "Gallery", swatch: "#e23a3a" },
  { id: "noir", label: "Noir", swatch: "#ff6b6b" },
  { id: "cafe", label: "Cafe", swatch: "#c45c26" },
  { id: "harbor", label: "Harbor", swatch: "#0b6e99" }
];

const SWATCHES = ["primary", "secondary", "tertiary", "ink"] as const;

createApp({
  setup() {
    const mode = useColorMode<ThemePack>({
      selector: "html",
      attribute: "data-theme",
      initialValue: "gallery",
      storageKey: "unocss-preset-palette-theme",
      modes: {
        gallery: "gallery",
        noir: "noir",
        cafe: "cafe",
        harbor: "harbor"
      }
    });

    function setTheme(next: ThemePack) {
      mode.value = next;
    }

    return () => {
      const current = (mode.value || "gallery") as ThemePack;

      return (
        <div class="bg-secondary paper-wash text-ink duration-400 min-h-full w-full transition-colors">
          <div class="mx-auto grid min-h-full w-full max-w-6xl grid-cols-1 md:grid-cols-2">
            <section class="rise flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <p class="text-ink/45 mb-5 text-[11px] font-semibold tracking-[0.16em] uppercase">
                UnoCSS Community
              </p>
              <h1 class="font-display text-ink mb-5 text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
                <span class="block">preset</span>
                <span class="block">palette</span>
              </h1>
              <p class="text-ink/65 max-w-[28ch] text-base leading-relaxed md:text-lg">
                Theme packs driven by
                {" "}
                <code class="bg-ink/8 rounded px-1.5 py-0.5 font-mono text-[13px]">data-theme</code>
                .
                Pick a pack — the swatches update with it.
              </p>
            </section>

            <section class="rise-delay flex items-center p-6 md:p-10 lg:p-12">
              <div class="border-ink/12 bg-ink/4 w-full rounded-2xl border border-solid p-5 md:p-6">
                <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p class="text-ink/40 mb-2 text-[10px] font-semibold tracking-[0.14em] uppercase">
                      Theme pack
                    </p>
                    <div class="flex flex-wrap gap-2" role="group" aria-label="Theme pack">
                      {THEMES.map((item) => {
                        const active = current === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            class={[
                              "duration-300 inline-flex cursor-pointer items-center gap-2 rounded-full border border-solid px-3 py-1.5 text-sm outline-none transition-colors",
                              active
                                ? "bg-primary border-primary text-white"
                                : "border-ink/25 text-ink/70 hover:border-primary/55 hover:text-primary bg-transparent"
                            ].join(" ")}
                            aria-pressed={active}
                            onClick={() => setTheme(item.id)}
                          >
                            <span
                              class={[
                                "h-2.5 w-2.5 rounded-full",
                                active ? "ring-1 ring-white/70 ring-offset-1 ring-offset-primary" : "opacity-90"
                              ].join(" ")}
                              style={{ backgroundColor: item.swatch }}
                            />
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <p class="text-ink/40 font-mono text-[11px]">
                    data-theme=
                    {current}
                  </p>
                </div>

                <div class="mb-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {SWATCHES.map((name) => (
                    <div
                      key={name}
                      class={[
                        "duration-400 flex min-h-28 items-end rounded-xl p-3 transition-colors md:min-h-36",
                        name === "primary" && "bg-primary",
                        name === "secondary" && "bg-secondary border-ink/30 border border-dashed",
                        name === "tertiary" && "bg-tertiary",
                        name === "ink" && "bg-ink"
                      ].filter(Boolean).join(" ")}
                    >
                      <span class="rounded bg-black/45 px-1.5 py-0.5 font-mono text-[11px] text-white">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>

                <div class="border-ink/10 bg-ink/5 flex flex-wrap items-center gap-4 rounded-xl border border-solid px-4 py-3.5">
                  <button
                    type="button"
                    class="bg-primary text-white hover:bg-primary/85 duration-300 cursor-pointer rounded-md border-none px-4 py-2 text-sm outline-none transition-colors"
                  >
                    Button
                  </button>
                  <p class="font-display text-ink text-base">
                    Sample on
                    {" "}
                    <span class="text-primary">primary</span>
                  </p>
                  <div class="from-primary to-tertiary ml-auto h-2 w-20 rounded-full bg-gradient-to-r" />
                </div>
              </div>
            </section>
          </div>
        </div>
      );
    };
  }
}).mount("#app");
