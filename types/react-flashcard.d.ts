declare module 'react-flashcard' {
  export interface FlashcardData {
    front: {
      text: string;
      image?: string;
    };
    back: {
      text: string;
      image?: string;
    };
  }

  export interface FlashcardComponentProps {
    dataSource: FlashcardData[];
    flipDirection?: 'horizontal' | 'vertical';
    onChange?: (step: number, size: number) => void;
    onFinish?: () => void;
  }

  export const FlashcardComponent: React.FC<FlashcardComponentProps>;
}