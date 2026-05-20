import { useState } from "react";
import { UnstyledButton } from "@mantine/core";

type DiscountType = "percent" | "fixed" | "item";

const FormLabel = ({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div>
    <div
      style={{
        fontFamily: "var(--fb-mono)",
        fontSize: 10.5,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "rgba(31,26,21,0.55)",
        marginBottom: 8,
      }}
    >
      {label}
      {hint && (
        <span
          style={{
            textTransform: "none",
            letterSpacing: 0,
            marginLeft: 8,
            opacity: 0.7,
          }}
        >
          · {hint}
        </span>
      )}
    </div>
    {children}
  </div>
);

export const DiscountsPage = () => {
  const [type, setType] = useState<DiscountType>("percent");
  const [value, setValue] = useState(15);
  const [expiry, setExpiry] = useState(30);
  const [cap, setCap] = useState(3);
  const [active, setActive] = useState(true);

  return (
    <div
      style={{
        padding: "28px 32px",
        overflowY: "auto",
        height: "100%",
        fontFamily: "var(--fb-sans)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--fb-serif)",
          fontSize: 28,
          fontStyle: "italic",
          letterSpacing: "-0.01em",
          color: "var(--fb-ink)",
        }}
      >
        Rabaty
      </div>
      <div style={{ fontSize: 13, color: "rgba(31,26,21,0.55)", marginTop: 4 }}>
        To, co dostaje każdy gość po wystawieniu opinii.
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: 24,
          marginTop: 22,
        }}
      >
        {/* Form */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <FormLabel label="Rodzaj nagrody">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {(
                [
                  { k: "percent", l: "Procent zniżki", s: "% od rachunku" },
                  { k: "fixed", l: "Kwota stała", s: "zł od rachunku" },
                  { k: "item", l: "Darmowy produkt", s: "np. deser" },
                ] as const
              ).map((o) => (
                <UnstyledButton
                  key={o.k}
                  onClick={() => setType(o.k)}
                  style={{
                    padding: "14px 12px",
                    borderRadius: 12,
                    background: type === o.k ? "var(--fb-cream)" : "#fff",
                    border:
                      type === o.k
                        ? "1.5px solid var(--fb-ink)"
                        : "1px solid rgba(31,26,21,0.12)",
                    textAlign: "left",
                    fontFamily: "var(--fb-sans)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--fb-ink)",
                    }}
                  >
                    {o.l}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "rgba(31,26,21,0.55)",
                      marginTop: 2,
                    }}
                  >
                    {o.s}
                  </div>
                </UnstyledButton>
              ))}
            </div>
          </FormLabel>

          <FormLabel label={type === "item" ? "Opis produktu" : "Wartość"}>
            {type === "item" ? (
              <input
                defaultValue="Darmowy deser do wyboru"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid rgba(31,26,21,0.12)",
                  background: "#fff",
                  fontFamily: "var(--fb-sans)",
                  fontSize: 14,
                  color: "var(--fb-ink)",
                  outline: "none",
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 2,
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "#fff",
                    border: "1px solid rgba(31,26,21,0.12)",
                    width: 160,
                  }}
                >
                  <input
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value) || 0)}
                    style={{
                      border: "none",
                      background: "transparent",
                      outline: "none",
                      fontFamily: "var(--fb-serif)",
                      fontSize: 28,
                      fontStyle: "italic",
                      width: "100%",
                      color: "var(--fb-ink)",
                    }}
                  />
                  {(type === "percent" || type === "fixed") && (
                    <span
                      style={{
                        fontSize: 18,
                        color: "rgba(31,26,21,0.55)",
                      }}
                    >
                      {type === "percent" ? "%" : "zł"}
                    </span>
                  )}
                </div>
                <input
                  type="range"
                  min={5}
                  max={type === "fixed" ? 50 : 40}
                  step={5}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  style={{
                    flex: 1,
                    accentColor: "var(--fb-primary)",
                  }}
                />
              </div>
            )}
          </FormLabel>

          <FormLabel label="Wygasa po">
            <div style={{ display: "flex", gap: 8 }}>
              {[14, 30, 60, 90].map((d) => (
                <UnstyledButton
                  key={d}
                  onClick={() => setExpiry(d)}
                  style={{
                    padding: "9px 16px",
                    borderRadius: 10,
                    background: expiry === d ? "var(--fb-ink)" : "#fff",
                    color: expiry === d ? "var(--fb-cream)" : "var(--fb-ink)",
                    border:
                      expiry === d ? "none" : "1px solid rgba(31,26,21,0.12)",
                    fontSize: 13,
                    fontFamily: "var(--fb-sans)",
                  }}
                >
                  {d} dni
                </UnstyledButton>
              ))}
            </div>
          </FormLabel>

          <FormLabel label="Dzienny limit na gościa" hint="Zapobiega nadużyciom.">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#fff",
                  border: "1px solid rgba(31,26,21,0.12)",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setCap(Math.max(1, cap - 1))}
                  style={{
                    width: 34,
                    height: 36,
                    background: "transparent",
                    border: "none",
                    fontSize: 16,
                    cursor: "pointer",
                    color: "var(--fb-ink)",
                  }}
                >
                  −
                </button>
                <div
                  style={{
                    padding: "0 14px",
                    fontFamily: "var(--fb-serif)",
                    fontSize: 20,
                    fontStyle: "italic",
                    minWidth: 30,
                    textAlign: "center",
                  }}
                >
                  {cap}
                </div>
                <button
                  type="button"
                  onClick={() => setCap(cap + 1)}
                  style={{
                    width: 34,
                    height: 36,
                    background: "transparent",
                    border: "none",
                    fontSize: 16,
                    cursor: "pointer",
                    color: "var(--fb-ink)",
                  }}
                >
                  +
                </button>
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: "rgba(31,26,21,0.55)",
                }}
              >
                kodów na urządzenie dziennie
              </div>
            </div>
          </FormLabel>

          <FormLabel label="Status">
            <UnstyledButton
              onClick={() => setActive(!active)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                background: "#fff",
                border: "1px solid rgba(31,26,21,0.12)",
                borderRadius: 10,
                fontFamily: "var(--fb-sans)",
                fontSize: 13,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 18,
                  borderRadius: 9,
                  background: active
                    ? "var(--fb-olive)"
                    : "rgba(31,26,21,0.15)",
                  position: "relative",
                  transition: "background 0.2s",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 2,
                    left: active ? 16 : 2,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#fff",
                    transition: "left 0.2s",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
              {active ? "Zbieramy opinie" : "Wstrzymane"}
            </UnstyledButton>
          </FormLabel>

          <div
            style={{
              display: "flex",
              gap: 10,
              paddingTop: 6,
            }}
          >
            <button
              type="button"
              style={{
                padding: "10px 20px",
                borderRadius: 10,
                background: "var(--fb-ink)",
                color: "var(--fb-cream)",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "var(--fb-sans)",
                fontWeight: 500,
              }}
            >
              Zapisz zmiany
            </button>
            <button
              type="button"
              style={{
                padding: "10px 20px",
                borderRadius: 10,
                background: "transparent",
                color: "var(--fb-ink)",
                border: "0.5px solid rgba(31,26,21,0.2)",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "var(--fb-sans)",
              }}
            >
              Resetuj
            </button>
          </div>
        </div>

        {/* Preview */}
        <div>
          <div
            style={{
              fontFamily: "var(--fb-mono)",
              fontSize: 10,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(31,26,21,0.5)",
              marginBottom: 10,
            }}
          >
            Gość widzi
          </div>
          <div
            style={{
              background: "var(--fb-ink)",
              color: "var(--fb-cream)",
              borderRadius: 16,
              padding: 20,
              position: "relative",
              boxShadow: "0 14px 30px -10px rgba(31,26,21,0.3)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--fb-mono)",
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                opacity: 0.55,
              }}
            >
              Twoja restauracja
            </div>
            <div
              style={{
                fontFamily: "var(--fb-serif)",
                fontSize: 36,
                lineHeight: 1,
                marginTop: 4,
                fontStyle: "italic",
                letterSpacing: "-0.02em",
              }}
            >
              {type === "percent"
                ? `${value}% rabatu`
                : type === "fixed"
                  ? `${value} zł rabatu`
                  : "Darmowy produkt"}
            </div>
            <div
              style={{
                fontFamily: "var(--fb-sans)",
                fontSize: 12,
                opacity: 0.7,
                marginTop: 2,
              }}
            >
              następna wizyta · na miejscu
            </div>
            <div
              style={{
                marginTop: 16,
                borderTop: "1px dashed rgba(251,247,239,0.25)",
                paddingTop: 12,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--fb-mono)",
                  fontSize: 10,
                  opacity: 0.5,
                  letterSpacing: "0.06em",
                }}
              >
                KOD
              </div>
              <div
                style={{
                  fontFamily: "var(--fb-mono)",
                  fontSize: 22,
                  letterSpacing: "0.12em",
                  marginTop: 2,
                }}
              >
                XXXX-XXXX
              </div>
              <div
                style={{
                  fontSize: 11,
                  opacity: 0.55,
                  marginTop: 6,
                }}
              >
                Ważny {expiry} dni od wydania
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
