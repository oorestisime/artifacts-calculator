import { artifactUpgrades } from "./data";

const artifactsLevels = [
  0,
  40,
  80,
  40 * 6,
  80 * 6,
  40 * 6 * 6,
  80 * 6 * 6,
  120 * 6 * 6,
  40 * 6 * 6 * 6,
  80 * 6 * 6 * 6,
  120 * 6 * 6 * 6,
  160 * 6 * 6 * 6,
];

const artifactsStars = {
  rare: [25, 50, 100, 150, 250, 750],
  epic: [35, 70, 140, 210, 350, 1050],
  legendary: [50, 100, 200, 300, 500, 1500],
};

const hpToAtkDivider = 3;
const defToAtkDivider = 5;

const totalUpgradeValue = ({
  infAtk,
  rangeAtk,
  cavAtk,
  infHp,
  rangeHp,
  cavHp,
  infDef,
  rangeDef,
  cavDef,
}) => {
  const atk = (infAtk || 0) + (rangeAtk || 0) + (cavAtk || 0);
  const hp = (infHp || 0) + (rangeHp || 0) + (cavHp || 0);
  const def = (infDef || 0) + (rangeDef || 0) + (cavDef || 0);

  return atk  + hp / hpToAtkDivider + def / defToAtkDivider;
};

export const resetFilters = {
  infAtk: 0,
  rangeAtk: 0,
  cavAtk: 0,
  infHp: 0,
  rangeHp: 0,
  cavHp: 0,
  infDef: 0,
  rangeDef: 0,
  cavDef: 0,
};

export const artifactStarUpgrade = (artifactType, artifactLevel, upgrades) => {
  const stars = artifactsStars[artifactType][artifactLevel];
  const value = totalUpgradeValue(upgrades);
  return value / stars;
};

export const artifactsLevelUpgrade = (
  artifactType,
  artifactLevel,
  upgrades
) => {
  const books = artifactsLevels[artifactLevel];
  const value = totalUpgradeValue(upgrades);
  console.log(value, books, value / books);
  return value / books;
};

export interface Upgrade {
  upgradeType: "level" | "star";
  artifactName: string;
  upgradeStep: number;
  value: number;
  upgrade: {
    infAtk: number;
    rangeAtk: number;
    cavAtk: number;
    infHp: number;
    rangeHp: number;
    cavHp: number;
    infDef: number;
    rangeDef: number;
    cavDef: number;
  };
}

export const getUpgradeLevelValueFromData = (
  artifact,
  currentLevel,
  currentStar
): Upgrade => {
  const upgradeKeys = Object.keys(artifactUpgrades[artifact]);
  const upgrade = { ...resetFilters };
  for (const key of upgradeKeys) {
    const diff =
      artifactUpgrades[artifact][key][currentLevel + 1][currentStar] -
      artifactUpgrades[artifact][key][currentLevel][currentStar];
    upgrade[key] = diff;
  }
  console.log(currentLevel);

  return {
    artifactName: artifact,
    upgradeType: "level",
    upgradeStep: currentLevel,
    value: artifactsLevelUpgrade("", currentLevel, upgrade),
    upgrade,
  };
};

export const getUpgradeStarValueFromData = (
  artifact,
  currentLevel,
  currentStar
): Upgrade => {
  const upgradeKeys = Object.keys(artifactUpgrades[artifact]);
  const upgrade = { ...resetFilters };
  for (const key of upgradeKeys) {
    const diff =
      artifactUpgrades[artifact][key][currentLevel][currentStar + 1] -
      artifactUpgrades[artifact][key][currentLevel][currentStar];
    upgrade[key] = diff;
  }
  return {
    artifactName: artifact,
    upgradeType: "star",
    upgradeStep: currentStar,
    value: artifactStarUpgrade("legendary", currentStar, upgrade),
    upgrade,
  };
};
