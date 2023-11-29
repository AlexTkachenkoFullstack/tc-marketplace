import { IModel } from "types/IModel";
import { IRegion } from "types/IRegion";

export const getArrayOfId=(regions:IRegion[], selectedRegions:string | string[])=>{
    const selectedToFilter = new Set(selectedRegions); 

const ids:number[] = [];
for (const item of regions) {
  if (selectedToFilter.has(item.region)) {
    ids.push(item.regionId);
  }
}
return ids
}


export const getArrayModelsOfId=(models:IModel[], selectedModels:string | string[])=>{
    const selectedToFilter = new Set(selectedModels); 

const ids:number[] = [];
for (const item of models) {
  if (selectedToFilter.has(item.model)) {
    ids.push(item.modelId);
  }
}
return ids
}

