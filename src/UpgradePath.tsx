import React from "react";
import { useLocalStorage } from "react-use";
import { ArtifactLevelSelect } from "./ArtifactLevelSelect";
import { ArtifactStarSelect } from "./ArtifactStarSelect";
import { artifactImages, artifactsMapNames, artifactsMapRarity } from "./data";
import { calculateUpgradePath, Upgrade } from "./calculator";

const initialSetup = Object.keys(artifactsMapNames).reduce((acc, current) => {
  acc[current] = { level: 1, star: 0, unlocked: true, name: current };
  return acc;
}, {});

export const UpgradePath = () => {
  const [currentSetup, setCurrentSetup, remove] = useLocalStorage(
    "current-setup",
    initialSetup
  );
  const [result, setResult] = React.useState<{
    level: Upgrade[];
    star: Upgrade[];
  }>();
  const [nameFilter, setNameFilter] = React.useState("");
  return (
    <div className="mx-auto">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 -ml-4">
              Artifacts
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the artifacts in your account including their level
              and star.
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Save your list and calculate your optimal upgrade path
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => setResult(calculateUpgradePath(currentSetup))}
              className="mx-4 inline-flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto"
            >
              Calculate
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col relative">
          <label htmlFor="filter" className="sr-only">
            Artifact filter
          </label>
          <input
            type="filter"
            name="filter"
            id="filter"
            className="w-60 p-2 my-4 -ml-6 rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
            placeholder="Search for artifact..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-sky-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-sky-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-sky-500/[0.16] dark:scrollbar-thumb:!bg-sky-500/50 max-h-96 supports-scrollbars:pr-2 lg:max-h-96">
                <table
                  className="min-w-full border-separate"
                  style={{ borderSpacing: 0 }}
                >
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                      >
                        Artifact
                      </th>

                      <th
                        scope="col"
                        className="sticky top-0 z-10  border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter "
                      >
                        Level
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                      >
                        Star
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                      >
                        Owned
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" bg-white">
                    {Object.keys(artifactsMapNames)
                      .filter((artifact) =>
                        artifact
                          .toLowerCase()
                          .startsWith(nameFilter.toLowerCase())
                      )
                      .map((artifact) => (
                        <tr key={artifact}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={artifactImages[artifact]}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {artifactsMapNames[artifact]}
                                </div>
                                <div className="text-gray-500 capitalize">
                                  {artifactsMapRarity[artifact]}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <ArtifactLevelSelect
                              id={`${artifact}level`}
                              value={currentSetup[artifact]?.level}
                              onChange={(e) => {
                                setCurrentSetup({
                                  ...currentSetup,
                                  [artifact]: {
                                    ...currentSetup[artifact],
                                    name: artifact,
                                    level: +e.target.value,
                                  },
                                });
                              }}
                            />
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <ArtifactStarSelect
                              id={`${artifact}star`}
                              value={currentSetup[artifact]?.star}
                              onChange={(e) => {
                                setCurrentSetup({
                                  ...currentSetup,
                                  [artifact]: {
                                    ...currentSetup[artifact],
                                    name: artifact,
                                    star: +e.target.value,
                                  },
                                });
                              }}
                            />
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <input
                              id={`${artifact}enabled`}
                              type="checkbox"
                              checked={currentSetup[artifact]?.unlocked}
                              onChange={(e) => {
                                setCurrentSetup({
                                  ...currentSetup,
                                  [artifact]: {
                                    ...currentSetup[artifact],
                                    name: artifact,
                                    unlocked: e.target.checked,
                                  },
                                });
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {result && (
        <div className="mt-6 px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-gray-900 -ml-4 pt-4">
            Upgrade your artifacts in the following order
          </h2>
          <p className="text-sm text-gray-700 my-4">
            Don't forget to update your levels/stars after upgrades!
            <br />
            Only first 20 upgrades are shown below!
          </p>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h3 className="text-xl font-semibold text-gray-900 -ml-2">
                Levels
              </h3>
              {result.level
                .sort((a, b) => b.value - a.value)
                .slice(0, 20)
                .map((artifact) => (
                  <li>{`Upgrade ${
                    artifactsMapNames[artifact.artifactName]
                  } to level ${artifact.upgradeStep + 1}`}</li>
                ))}
            </div>
            <div className="sm:flex-auto">
              <h2 className="text-xl font-semibold text-gray-900 -ml-2">
                Star
              </h2>
              {result.star
                .sort((a, b) => b.value - a.value)
                .slice(0, 20)
                .map((artifact) => (
                  <li>{`Upgrade ${
                    artifactsMapNames[artifact.artifactName]
                  } to star ${artifact.upgradeStep + 1}`}</li>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
