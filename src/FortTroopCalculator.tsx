import React from "react";
import { resetResult, resetTroops, troopCalculator } from "./troop-calculator";
const Results = ({ result }) => {
  return (
    <div className="mt-10 ">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Calculated Troops
            </h2>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-slate-100 px-4 py-5 sm:p-6">
              <div className="mx-auto">
                <div className="mx-auto pb-6">
                  <h2 className="text-xl leading-4 font-medium text-gray-900">
                    T5 Troops for each type below!
                  </h2>
                  <div className="mx-auto">
                    <dl className="mt-2 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
                      <div className="relative overflow-hidden rounded-lg bg-white px-4 py-2 shadow ">
                        <dt>
                          <p className="ml-16 truncate text-sm font-medium text-gray-500">
                            T5 Infantry
                          </p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-2">
                          <p className="text-2xl font-semibold text-gray-900">
                            {result.t5inf}
                          </p>
                        </dd>
                      </div>
                      <div className="relative overflow-hidden rounded-lg bg-white px-4 py-2 shadow ">
                        <dt>
                          <p className="ml-16 truncate text-sm font-medium text-gray-500">
                            T5 Range
                          </p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-2">
                          <p className="text-2xl font-semibold text-gray-900">
                            {result.t5range}
                          </p>
                        </dd>
                      </div>
                      <div className="relative overflow-hidden rounded-lg bg-white px-4 py-2 shadow ">
                        <dt>
                          <p className="ml-16 truncate text-sm font-medium text-gray-500">
                            T5 Cavalry
                          </p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-2">
                          <p className="text-2xl font-semibold text-gray-900">
                            {result.t5cav}
                          </p>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="mx-auto">
                <div className="mx-auto pb-6">
                  <h2 className="text-xl leading-4 font-medium text-gray-900">
                    T4 Troops for each type below!
                  </h2>
                  <div className="mx-auto">
                    <dl className="mt-2 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
                      <div className="relative overflow-hidden rounded-lg bg-white px-4 py-2 shadow ">
                        <dt>
                          <p className="ml-16 truncate text-sm font-medium text-gray-500">
                            T4 Infantry
                          </p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-2">
                          <p className="text-2xl font-semibold text-gray-900">
                            {result.t4inf}
                          </p>
                        </dd>
                      </div>
                      <div className="relative overflow-hidden rounded-lg bg-white px-4 py-2 shadow ">
                        <dt>
                          <p className="ml-16 truncate text-sm font-medium text-gray-500">
                            T4 Range
                          </p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-2">
                          <p className="text-2xl font-semibold text-gray-900">
                            {result.t4range}
                          </p>
                        </dd>
                      </div>
                      <div className="relative overflow-hidden rounded-lg bg-white px-4 py-2 shadow ">
                        <dt>
                          <p className="ml-16 truncate text-sm font-medium text-gray-500">
                            t4 Cavalry
                          </p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-2">
                          <p className="text-2xl font-semibold text-gray-900">
                            {result.t4cav}
                          </p>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const faqs = [
  {
    question: "The Calculate button is not working",
    answer:
      "The button is getting disabled if you don't enter a correct comp of troops that doesn't add up to 100%!",
  },
  {
    question: "Can i change the Total Troops?",
    answer:
      "The total number of troops are set to 200k by default, you can change them by typing another number up to 375k or by 25k with the up and down arrows!",
  },
  {
    question: "Can i change the percent of the t5 troops?",
    answer:
      "Same as the total number of your troops, it is set to 60% by default and you can type any value up to 100% or change it by 10% each step with the arrows!",
  },
];
const Instructions = () => {
  return (
    <div className="mx-auto py-8">
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            {`Can't find the answer you're looking for? That's unfortunate!`}
          </p>
        </div>
        <div className="mt-12 lg:col-span-2 lg:mt-0">
          <dl className="space-y-12">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-lg font-medium leading-6 text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
const FortCalculator = () => {
  const [troops, setTroops] = React.useState({
    infTroop: 0,
    rangeTroop: 0,
    cavTroop: 0,
    totalTroops: 200000,
    t5Troops: 60,
  });
  const [result, setResult] = React.useState({
    t5inf: 0,
    t5range: 0,
    t5cav: 0,
    t4inf: 0,
    t4range: 0,
    t4cav: 0,
  });
  const calculateTroops = () => {
    const troopsCalculated = troopCalculator(troops);
    setResult({ ...troopsCalculated.t5, ...troopsCalculated.t4 });
  };
  const totalComp = troops.infTroop + troops.rangeTroop + troops.cavTroop;
  console.log(totalComp % 10);
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Calculate Fort Combos
            </h2>

            <p className="mt-4 text-lg text-gray-500">
              Enter the troop Comb e.g 4-4-2, total number of troops and t5
              percentage you want to calculate!
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-slate-100 px-4 py-5 sm:p-6">
              <div className="grid grid-cols-9 gap-6">
                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="infTroop"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Infantry
                  </label>
                  <select
                    id="infTroop"
                    name="infTroop"
                    onChange={(e) =>
                      setTroops({
                        ...troops,
                        infTroop: parseFloat(e.target.value),
                      })
                    }
                    value={troops.infTroop}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="rangeTroop"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ranged
                  </label>
                  <select
                    onChange={(e) =>
                      setTroops({
                        ...troops,
                        rangeTroop: parseFloat(e.target.value),
                      })
                    }
                    id="rangeTroop"
                    name="rangeTroop"
                    value={troops.rangeTroop}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="cavTroop"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cavalry
                  </label>
                  <select
                    onChange={(e) =>
                      setTroops({
                        ...troops,
                        cavTroop: parseFloat(e.target.value),
                      })
                    }
                    id="cavTroop"
                    name="cavTroop"
                    value={troops.cavTroop}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="totalTroops"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total Troops
                  </label>
                  <input
                    onChange={(e) =>
                      setTroops({
                        ...troops,
                        totalTroops: parseFloat(e.target.value),
                      })
                    }
                    type="number"
                    step="25000"
                    min="0"
                    max="375000"
                    name="totalTroops"
                    id="totalTroops"
                    placeholder="200000"
                    value={troops.totalTroops}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="t5Percent"
                    className="block text-sm font-medium text-gray-700"
                  >
                    T5 Percent
                  </label>
                  <input
                    onChange={(e) =>
                      setTroops({
                        ...troops,
                        t5Troops: parseFloat(e.target.value),
                      })
                    }
                    type="number"
                    step="10"
                    min="0"
                    value={troops.t5Troops}
                    max="100"
                    placeholder="60"
                    name="t5Percent"
                    id="t5Percent"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                {totalComp % 10 !== 0 && (
                  <span className="text-slate-600 mr-4">
                    Enter a correct comp to calculate!
                  </span>
                )}

                <button
                  onClick={() => {
                    setTroops(resetTroops);
                    setResult(resetResult);
                  }}
                  className={`inline-flex justify-center rounded-md border border-transparent px-4 mx-2 text-base font-medium text-sky-600 hover:bg-sky-50`}
                >
                  Reset
                </button>
                <button
                  disabled={totalComp % 10 !== 0}
                  onClick={calculateTroops}
                  className={`disabled:opacity-75 inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2`}
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {Object.values(result).reduce((a, b) => a + b, 0) > 0 && (
        <Results result={result} />
      )}
      <Instructions />
    </div>
  );
};

export default FortCalculator;
