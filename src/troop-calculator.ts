export const troopCalculator = ({
  infTroop,
  rangeTroop,
  cavTroop,
  totalTroops,
  t5Troops,
}) => {
  let troopArray = [infTroop, rangeTroop, cavTroop];

  const total = troopArray.reduce((a, b) => a + b, 0);
  if (total === 10) troopArray = troopArray.map((troop) => troop * 2);
  const allTroops = troopArray.map((newTroop) => (newTroop * totalTroops) / 20);
  const t5calc = allTroops.map((t5troop) => (t5troop * t5Troops) / 100);
  const t4calc = allTroops.map((troop, index) => troop - t5calc[index]);
  const calculatedTroops = {
    t5: { t5inf: t5calc[0], t5range: t5calc[1], t5cav: t5calc[2] },
    t4: { t4inf: t4calc[0], t4range: t4calc[1], t4cav: t4calc[2] },
  };
  return calculatedTroops;
};

export const resetTroops = {
  infTroop: 1,
  rangeTroop: 1,
  cavTroop: 1,
  totalTroops: 200000,
  t5Troops: 60,
};
