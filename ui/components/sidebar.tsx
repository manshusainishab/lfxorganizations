import type { JSX } from "react"
import { motion } from "framer-motion"
import type { SidebarProps } from "../types/index"
import { CheckCircle2, Circle } from "lucide-react"

const YEARS: number[] = [2025, 2024, 2023, 2022, 2021, 2020]
const TERMS: (1 | 2 | 3)[] = [1, 2, 3]

export function Sidebar({
  selectedYears,
  setSelectedYears,
  selectedTerms,
  setSelectedTerms,
}: SidebarProps): JSX.Element {
  const toggleYear = (year: number): void => {
    setSelectedYears(
      selectedYears.includes(year)
        ? selectedYears.filter((y) => y !== year)
        : [...selectedYears, year]
    )
  }

  const toggleTerm = (term: 1 | 2 | 3): void => {
    setSelectedTerms(
      selectedTerms.includes(term)
        ? selectedTerms.filter((t) => t !== term)
        : [...selectedTerms, term]
    )
  }

  return (
    <aside
      className="
        w-72 hidden md:flex flex-col
        sticky top-16 h-[calc(100vh-4rem)]
        backdrop-blur-lg bg-white/10 dark:bg-slate-900/40
        border-r border-white/10 dark:border-slate-800
        shadow-[0_0_25px_rgba(0,0,0,0.15)]
        hover:shadow-[0_0_35px_rgba(0,0,0,0.25)]
        transition-all duration-300
      "
    >
      <div className="p-6 space-y-10 overflow-y-auto">
        {/* YEARS FILTER */}
        <section>
          <h3 className="text-sm font-semibold tracking-wide text-primary mb-3 uppercase">
            Years
          </h3>
          <div className="flex flex-col gap-2">
            {YEARS.map((year, i) => {
              const active = selectedYears.includes(year)
              return (
                <motion.button
                  key={year}
                  onClick={() => toggleYear(year)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 250, damping: 15 }}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-xl text-sm
                    transition-all duration-300
                    ${
                      active
                        ? "bg-primary/20 text-primary font-medium border border-primary/30"
                        : "hover:bg-primary/10 text-muted-foreground border border-transparent"
                    }
                  `}
                >
                  {active ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : (
                    <Circle className="h-4 w-4 opacity-60" />
                  )}
                  <span>{year}</span>
                </motion.button>
              )
            })}
          </div>
        </section>

        {/* TERMS FILTER */}
        <section>
          <h3 className="text-sm font-semibold tracking-wide text-primary mb-3 uppercase">
            Terms
          </h3>
          <div className="flex flex-col gap-2">
            {TERMS.map((term) => {
              const active = selectedTerms.includes(term)
              return (
                <motion.button
                  key={term}
                  onClick={() => toggleTerm(term)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 250, damping: 15 }}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-xl text-sm
                    transition-all duration-300
                    ${
                      active
                        ? "bg-primary/20 text-primary font-medium border border-primary/30"
                        : "hover:bg-primary/10 text-muted-foreground border border-transparent"
                    }
                  `}
                >
                  {active ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : (
                    <Circle className="h-4 w-4 opacity-60" />
                  )}
                  <span>Term {term}</span>
                </motion.button>
              )
            })}
          </div>
        </section>
      </div>
    </aside>
  )
}
