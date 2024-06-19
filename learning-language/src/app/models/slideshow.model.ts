export interface Slide {
    id: number;
    order: number;
    template: 'LETTER_PRESENTATION' | 'IMAGE_TITLE_SENTENCE' | 'MULTIPLE_CHOICE_TEXT';
  }
  
  export interface GetSlideshowsResponse {
    id: number;
    slides: Slide[];
  }

  export interface SlideImage {
    url: string;
  }
  
  export interface ImageTitleSentenceSlide {
    id: number;
    template: string;
    text: string;
    images: SlideImage[];
    imagesCount: number;
    audioUrl: string;
    backgroundColor: string;
    isAnimated: boolean;
    requiresAnswer: boolean;
  }

  export interface LetterPresentationSlide {
    id: number;
    template: 'LETTER_PRESENTATION';
    text: string;
    isAnimated: boolean;
    audioUrl: string;
    backgroundColor: string;
    requiresAnswer: boolean;
  }

  export interface Option {
    id: number;
    text: string;
    expectedSelection: boolean;
  }
  
  export interface MultipleChoiceTextSlide {
    id: number;
    template: 'MULTIPLE_CHOICE_TEXT';
    textOptions: Option[];
    audioUrl: string;
    requiresAnswer: boolean;
  }