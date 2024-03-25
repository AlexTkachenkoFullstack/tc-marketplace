import Decimal from 'decimal.js';
export function generateEngineVolumes(
    startVolume: number,
    endVolume: number,
    step: number,
  ): string[] {
    const volumes: string[] = [];
    for (
      let volume = new Decimal(startVolume);
      volume.lte(endVolume);
      volume = volume.plus(step)
    ) {
      volumes.push(volume.toFixed(1));
    }
    return volumes;
  }