
export enum BeefShareType {
    QUARTER = 'Quarter Cow',
    HALF = 'Half Cow',
    WHOLE = 'Whole Cow'
}

export interface ShareDetail {
    id: string;
    type: BeefShareType;
    subtitle: string;
    weightRange: string;
    storageInfo: string;
    idealFor: string;
    imageUrl: string;
    isPopular?: boolean;
    iconName: string;
}

export type HouseholdSize = '1-2 People' | '3-4 People' | '5-6 People' | '7+ People';
export type ConsumptionLevel = 1 | 2 | 3; // 1: Light, 2: Moderate, 3: Heavy
