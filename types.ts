export interface Coordinates {
    x: number;
    y: number;
}

export interface TrigState {
    angle: number; // in degrees (0-360)
    radians: number;
    sin: number;
    cos: number;
    tan: number;
    sec: number;
    csc: number;
    cot: number;
}

export interface ChartDataPoint {
    angle: number;
    sin: number | null;
    cos: number | null;
    tan: number | null;
    cot: number | null;
    sec: number | null;
    csc: number | null;
}