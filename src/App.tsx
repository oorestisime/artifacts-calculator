import React from "react";
import {
  artifactStarUpgrade,
  artifactsLevelUpgrade,
  resetFilters,
} from "./calculator";

const Header = ({ activeTab, setActiveTab, setFilters, setResult }) => {
  const activeTabStyles = "bg-sky-100 text-sky-700";
  const inactiveTabStyles = "text-sky-50 hover:text-sky-700 hover:bg-sky-50";
  return (
    <header className="bg-sky-600">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-sky-500 py-6 lg:border-none">
          <div className="flex items-center">
            <a href="#" className="text-2xl text-slate-50">
              <span>Artifacts Calculator</span>
            </a>
            <div className="ml-10  space-x-8">
              <div>
                <nav className="flex space-x-4" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab("levels")}
                    className={`${
                      activeTab === "levels"
                        ? activeTabStyles
                        : inactiveTabStyles
                    } px-3 py-2 font-medium text-sm rounded-md`}
                  >
                    Levels
                  </button>

                  <button
                    onClick={() => setActiveTab("stars")}
                    className={`${
                      activeTab === "stars"
                        ? activeTabStyles
                        : inactiveTabStyles
                    } px-3 py-2 font-medium text-sm rounded-md`}
                  >
                    Stars
                  </button>
                </nav>
              </div>
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <button
              onClick={() => {
                setFilters(resetFilters);
                setResult(0);
              }}
              className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-sky-600 hover:bg-sky-50"
            >
              Reset
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Filters = ({ filters, setFilters, activeTab, setResult }) => {
  const [level, setLevel] = React.useState(1);
  const [artifactType, setArtifactType] = React.useState("legendary");
  const isButtonDisabled = Object.values(filters).every((x) => {
    return (x || 0) === 0;
  });
  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Artifact Upgrade
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Fill the information about the stats you will gain from artifact
                upgrade
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Use , for decimals not .
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Consider ATK, Leader ATK and Fury ATK the same. Just calculate
                total ATK, HP, DEF
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-slate-100 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-9 gap-6">
                  {activeTab === "levels" ? (
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="level"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Level
                      </label>
                      <select
                        onChange={(e) => setLevel(parseFloat(e.target.value))}
                        id="level"
                        name="level"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="1">1-2</option>
                        <option value="2">2-3</option>
                        <option value="3">3-4</option>
                        <option value="4">4-5</option>
                        <option value="5">5-6</option>
                        <option value="6">6-7</option>
                        <option value="7">7-8</option>
                        <option value="8">8-9</option>
                        <option value="9">9-10</option>
                        <option value="10">10-11</option>
                        <option value="11">11-12</option>
                      </select>
                    </div>
                  ) : (
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="star"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Star
                      </label>
                      <select
                        onChange={(e) => setLevel(parseFloat(e.target.value))}
                        id="star"
                        name="star"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="1">1-2</option>
                        <option value="2">2-3</option>
                        <option value="3">3-4</option>
                        <option value="4">4-5</option>
                        <option value="5">Blessed</option>
                      </select>
                    </div>
                  )}
                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="artifactType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Artifact type
                    </label>
                    <select
                      onChange={(e) => setArtifactType(e.target.value)}
                      id="artifactType"
                      name="artifactType"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="epic">Epic</option>
                      <option value="rare">Rare</option>
                      <option value="legendary">Legendary</option>
                    </select>
                  </div>
                  <div className="col-span-4 sm:col-span-3">
                    <label
                      htmlFor="infAtk"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Infantry ATK
                    </label>
                    <input
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          infAtk: parseFloat(e.target.value),
                        })
                      }
                      type="number"
                      step="0.01"
                      min="0"
                      value={filters.infAtk}
                      name="infAtk"
                      id="infAtk"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-3">
                    <label
                      htmlFor="rangeAtk"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Range ATK
                    </label>
                    <input
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          rangeAtk: parseFloat(e.target.value),
                        })
                      }
                      type="number"
                      step="0.01"
                      min="0"
                      value={filters.rangeAtk}
                      name="rangeAtk"
                      id="rangeAtk"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-3">
                    <label
                      htmlFor="cavAtk"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cavalry ATK
                    </label>
                    <input
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          cavAtk: parseFloat(e.target.value),
                        })
                      }
                      type="number"
                      step="0.01"
                      min="0"
                      value={filters.cavAtk}
                      name="cavAtk"
                      id="cavAtk"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-3">
                    <label
                      htmlFor="infHp"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Infantry HP
                    </label>
                    <input
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          infHp: parseFloat(e.target.value),
                        })
                      }
                      type="number"
                      step="0.01"
                      min="0"
                      value={filters.infHp}
                      name="infHp"
                      id="infHp"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-3">
                    <label
                      htmlFor="rangeHp"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Range HP
                    </label>
                    <input
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          rangeHp: parseFloat(e.target.value),
                        })
                      }
                      type="number"
                      step="0.01"
                      min="0"
                      value={filters.rangeHp}
                      name="rangeHp"
                      id="rangeHp"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-3">
                    <label
                      htmlFor="cavHp"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cavalry HP
                    </label>
                    <input
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          cavAtk: parseFloat(e.target.value),
                        })
                      }
                      type="number"
                      step="0.01"
                      min="0"
                      value={filters.cavHp}
                      name="cavHp"
                      id="cavHp"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-4 sm:col-span-3">
                    <label
                      htmlFor="infDef"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Infantry DEF
                    </label>
                    <input
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          infDef: parseFloat(e.target.value),
                        })
                      }
                      type="number"
                      step="0.01"
                      min="0"
                      value={filters.infDef}
                      name="infDef"
                      id="infDef"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-3">
                    <label
                      htmlFor="rangeDef"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Range DEF
                    </label>
                    <input
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          rangeDef: parseFloat(e.target.value),
                        })
                      }
                      type="number"
                      step="0.01"
                      min="0"
                      value={filters.rangeDef}
                      name="rangeDef"
                      id="rangeDef"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-3">
                    <label
                      htmlFor="cavDef"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cavalry DEF
                    </label>
                    <input
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          cavDef: parseFloat(e.target.value),
                        })
                      }
                      type="number"
                      step="0.01"
                      min="0"
                      value={filters.cavDef}
                      name="cavDef"
                      id="cavDef"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={isButtonDisabled}
                  onClick={() =>
                    setResult(
                      activeTab === "levels"
                        ? artifactsLevelUpgrade(artifactType, level, filters)
                        : artifactStarUpgrade(artifactType, level, filters)
                    )
                  }
                  className={`disabled:opacity-75 inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2`}
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Results = ({ result, activeTab }) => {
  return (
    <div className="mt-4 pb-4">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {`Value per ${activeTab === "levels" ? "book" : "brush"}`}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Books are converted to green to calculate the upgrade value
            </p>
            <p className="mt-1 text-sm text-gray-600">HP is / 3 of ATK</p>
            <p className="mt-1 text-sm text-gray-600">DEF is / 5 of ATK</p>
            <p className="mt-1 text-sm text-gray-600">
              Doesn't take into account training speed or travel speed or other
              upgrades
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-slate-100 px-4 py-5 sm:p-6">
              {parseFloat(result.toFixed(6))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const navigation = {
  social: [
    {
      name: "Youtube",
      href: "https://www.youtube.com/c/HellenicDynastyLords",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/oorestisime/artifacts-calculator",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-sky-700 px-10 py-4" aria-labelledby="footer-heading">
      <div className="border-b border-slate-100 pb-4 lg:flex lg:items-center lg:justify-between xl:mt-0">
        <div>
          <h3 className="text-base font-medium text-white">
            H|D is recruiting!
          </h3>
          <p className="mt-2 text-base text-slate-200">
            Greek speaking players with T5 (or close) and sigils!
          </p>
        </div>
      </div>
      <div className="mt-8 md:flex md:items-center md:justify-between">
        <div className="flex space-x-6 md:order-2">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-base text-slate-50 md:order-1 md:mt-0">
          &copy; H|D 2022.
        </p>
      </div>
    </footer>
  );
};

export function App() {
  const [activeTab, setActiveTab] = React.useState("levels");
  const [filters, setFilters] = React.useState(resetFilters);
  const [result, setResult] = React.useState(0);

  return (
    <>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setFilters={setFilters}
        setResult={setResult}
      />
      <div className="mx-auto px-12 py-12 pt-6 bg-slate-200">
        <Filters
          filters={filters}
          setFilters={setFilters}
          activeTab={activeTab}
          setResult={setResult}
        />
        {result > 0 && <Results activeTab={activeTab} result={result} />}
      </div>
      <Footer />
    </>
  );
}
