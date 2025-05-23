export function singleHopImpact(
  amountIn: string,
  amountOut: bigint,
  reserveIn: bigint,
  reserveOut: bigint
): string {
  // Convert string amount to bigint, removing decimals
  const newAmountIn = BigInt(amountIn);

  // Calculate price using bigint math with proper precision
  // We multiply by 1e18 to maintain precision in integer math
  const precision = 10n ** 18n;
  const initialPrice = (reserveOut * precision) / reserveIn;

  const newReserveIn = reserveIn + newAmountIn;
  const newReserveOut = reserveOut - amountOut;

  const newPrice = (newReserveOut * precision) / newReserveIn;

  // Calculate price impact percentage with bigint
  // Formula: ((newPrice - initialPrice) / initialPrice) * 100
  const priceChange =
    newPrice > initialPrice ? newPrice - initialPrice : initialPrice - newPrice;

  const priceImpact = Number(
    (priceChange * 100n * precision) / (initialPrice * precision)
  );

  return priceImpact.toString();
}

export function multiHopCumulativeImpact(
  intermediateImpact: string,
  finalImpact: string
) {
  const intermediateImpactDecimal = +intermediateImpact / 100;
  const finalImpactDecimal = +finalImpact / 100;

  const cumulativeImpact =
    (1 + intermediateImpactDecimal) * (1 + finalImpactDecimal) - 1;
  const cumulativeImpactPercentage = cumulativeImpact * 100;

  const roundedCumulativeImpactPercentage =
    Math.round(cumulativeImpactPercentage * 100) / 100;

  return cumulativeImpactPercentage >= 0
    ? roundedCumulativeImpactPercentage
    : -roundedCumulativeImpactPercentage;
}
