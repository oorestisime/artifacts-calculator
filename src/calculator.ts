const artifactsLevels = [
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

const atkToHpMultiplier = 3;
const atkToDefMultiplier = 5;

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
  const atk = infAtk || 0 + rangeAtk || 0 + cavAtk || 0;
  const hp = infHp || 0 + rangeHp || 0 + cavHp || 0;
  const def = infDef || 0 + rangeDef || 0 + cavDef || 0;

  return atk * atkToHpMultiplier + hp + def * atkToDefMultiplier;
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
  console.log(artifactType, artifactLevel);
  const stars = artifactsStars[artifactType][artifactLevel - 1];
  const value = totalUpgradeValue(upgrades);
  return value / stars;
};

export const artifactsLevelUpgrade = (
  artifactType,
  artifactLevel,
  upgrades
) => {
  const books = artifactsLevels[artifactLevel - 1];
  const value = totalUpgradeValue(upgrades);
  return value / books;
};
