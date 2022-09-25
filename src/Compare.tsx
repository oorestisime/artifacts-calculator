import React from "react";
import { ArtifactLevelSelect } from "./ArtifactLevelSelect";
import { ArtifactStarSelect } from "./ArtifactStarSelect";
import {
  getUpgradeLevelValueFromData,
  getUpgradeStarValueFromData,
  Upgrade,
} from "./calculator";
import { artifactsMapNames } from "./data";

const initialData = {
  artifact1: "ancientCalendar",
  artifact2: "mirrorOfDesire",
  artifact1Level: 1,
  artifact2Level: 1,
  artifact1Star: 0,
  artifact2Star: 0,
};

const ArtifactPicker = ({
  artifactKeyPrefix,
  currentData,
  setData,
}: {
  artifactKeyPrefix: string;
  currentData: typeof initialData;
  setData: (data: typeof initialData) => void;
}) => {
  return (
    <div className="col-span-6 mx-2">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        {artifactKeyPrefix === "artifact1" ? "Artifact 1" : "Artifact 2"}
      </h3>
      <div className="py-4">
        <label
          htmlFor={`${artifactKeyPrefix}-name`}
          className="block text-sm font-medium text-gray-700"
        >
          Artifact
        </label>
        <select
          onChange={(e) =>
            setData({
              ...currentData,
              [`${artifactKeyPrefix}`]: e.target.value,
            })
          }
          value={currentData[artifactKeyPrefix]}
          id={`${artifactKeyPrefix}-name`}
          name={`${artifactKeyPrefix}-name`}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
        >
          {Object.keys(artifactsMapNames).map((key) => (
            <option key={key} value={key}>
              {artifactsMapNames[key]}
            </option>
          ))}
        </select>
      </div>
      <div className="py-4">
        <ArtifactLevelSelect
          id={`${artifactKeyPrefix}level`}
          name={`${artifactKeyPrefix}level`}
          onChange={(e) =>
            setData({
              ...currentData,
              [`${artifactKeyPrefix}Level`]: parseFloat(e.target.value),
            })
          }
          label="Current Level"
          value={currentData[`${artifactKeyPrefix}Level`]}
        />
      </div>
      <div className="py-4">
        <ArtifactStarSelect
          id={`${artifactKeyPrefix}star`}
          name={`${artifactKeyPrefix}star`}
          onChange={(e) =>
            setData({
              ...currentData,
              [`${artifactKeyPrefix}Star`]: parseFloat(e.target.value),
            })
          }
          label="Current Star"
          value={currentData[`${artifactKeyPrefix}Star`]}
        />
      </div>
    </div>
  );
};

const ArtifactResult = ({ artifactUpgrade }: { artifactUpgrade: Upgrade }) => {
  return (
    <div className="mx-auto pb-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        {`${artifactsMapNames[artifactUpgrade.artifactName]}: ${
          artifactUpgrade.upgradeStep
        } -> ${artifactUpgrade.upgradeStep + 1}`}
      </h3>
      <div>
        <div className="mx-auto">
          <dl className="mt-2 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
            {Object.keys(artifactUpgrade.upgrade).map((item) => {
              if (artifactUpgrade.upgrade[item] === 0) {
                return null;
              }
              return (
                <div
                  key={item}
                  className="relative overflow-hidden rounded-lg bg-white px-4 py-2 shadow "
                >
                  <dt>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">
                      {item}
                    </p>
                  </dt>
                  <dd className="ml-16 flex items-baseline pb-2">
                    <p className="text-2xl font-semibold text-gray-900">
                      {parseFloat(artifactUpgrade.upgrade[item]).toFixed(2)}%
                    </p>
                    <p className="text-green-600ml-2 flex items-baseline text-sm font-semibold">
                      <svg
                        className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                        x-description="Heroicon name: mini/arrow-up"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </p>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
};

const ArtifactCompareResult = ({
  artifact1,
  artifact2,
}: {
  artifact1: Upgrade;
  artifact2: Upgrade;
}) => {
  const bestUpgrade = artifact1.value > artifact2.value ? artifact1 : artifact2;
  return (
    <div className="pb-4">
      <h2 className="text-xl leading-4 font-medium text-gray-900">
        You should upgrade{" "}
        <span className="text-sky-600">
          {artifactsMapNames[bestUpgrade.artifactName]}
        </span>
        {` as it gives a better value for the ${
          bestUpgrade.upgradeType === "level" ? "books" : "brushes"
        } spent`}
      </h2>
    </div>
  );
};

const Results = ({
  artifact1LevelUpgradeValue,
  artifact2LevelUpgradeValue,
  artifact1StarUpgradeValue,
  artifact2StarUpgradeValue,
}: {
  artifact1LevelUpgradeValue: Upgrade;
  artifact2LevelUpgradeValue: Upgrade;
  artifact1StarUpgradeValue: Upgrade;
  artifact2StarUpgradeValue: Upgrade;
}) => {
  return (
    <>
      <div className="mt-10 ">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Level Upgrade
              </h2>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-slate-100 px-4 py-5 sm:p-6">
                <div className="mx-auto">
                  <ArtifactCompareResult
                    artifact1={artifact1LevelUpgradeValue}
                    artifact2={artifact2LevelUpgradeValue}
                  />
                </div>
                <div className="mx-auto">
                  <ArtifactResult
                    artifactUpgrade={artifact1LevelUpgradeValue}
                  />
                </div>
                <div className="mx-auto">
                  <ArtifactResult
                    artifactUpgrade={artifact2LevelUpgradeValue}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 ">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Star Upgrade
              </h2>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-slate-100 px-4 py-5 sm:p-6">
                <div className="mx-auto">
                  <ArtifactCompareResult
                    artifact1={artifact1StarUpgradeValue}
                    artifact2={artifact2StarUpgradeValue}
                  />
                </div>
                <div className="mx-auto">
                  <ArtifactResult artifactUpgrade={artifact1StarUpgradeValue} />
                </div>
                <div className="mx-auto">
                  <ArtifactResult artifactUpgrade={artifact2StarUpgradeValue} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Compare = () => {
  const [data, setData] = React.useState(initialData);
  const [result, setResult] = React.useState<{
    artifact1LevelUpgradeValue?: Upgrade;
    artifact2LevelUpgradeValue?: Upgrade;
    artifact1StarUpgradeValue?: Upgrade;
    artifact2StarUpgradeValue?: Upgrade;
  }>();

  const calculateUpgrades = () => {
    const artifact1LevelUpgradeValue = getUpgradeLevelValueFromData(
      data.artifact1,
      data.artifact1Level,
      data.artifact1Star
    );
    const artifact2LevelUpgradeValue = getUpgradeLevelValueFromData(
      data.artifact2,
      data.artifact2Level,
      data.artifact2Star
    );
    const artifact1StarUpgradeValue = getUpgradeStarValueFromData(
      data.artifact1,
      data.artifact1Level,
      data.artifact1Star
    );
    const artifact2StarUpgradeValue = getUpgradeStarValueFromData(
      data.artifact2,
      data.artifact2Level,
      data.artifact2Star
    );

    setResult({
      artifact1LevelUpgradeValue,
      artifact2LevelUpgradeValue,
      artifact1StarUpgradeValue,
      artifact2StarUpgradeValue,
    });
  };
  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Compare Artifact Upgrades
              </h2>

              <p className="mt-4 text-lg text-gray-500">
                Select your current level/star of your artifacts
              </p>
              <p className="mt-4 text-lg text-gray-500">
                Find out which is better to upgrade!
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-slate-100 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-12 gap-6">
                  <ArtifactPicker
                    currentData={data}
                    setData={setData}
                    artifactKeyPrefix="artifact1"
                  />
                  <ArtifactPicker
                    currentData={data}
                    setData={setData}
                    artifactKeyPrefix="artifact2"
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  onClick={calculateUpgrades}
                  className={`disabled:opacity-75 inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2`}
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {result?.artifact1LevelUpgradeValue !== undefined && (
        <Results {...result} />
      )}
    </>
  );
};
