export interface Step {
    id: number;
    title: string;
    slideshowId: number;
  }
  
  export interface GetStepsResponse {
    id: number;
    title: string;
    steps: Step[];
  }