import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Props {
  imageUrls: string[];
  className?: string;
}

export const CarouselProduct: React.FC<Props> = ({ imageUrls, className }) => {
  return (
    <div className="flex flex-1">
      <Carousel className={cn("", className)}>
        <CarouselContent>
          {imageUrls.map((imageUrl, index) => (
            <CarouselItem key={index}>
              <img
                src={imageUrl}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 h-10 w-10 border-destructive" />
        <CarouselNext className="right-2 top-1/2 -translate-y-1/2 h-10 w-10 border-destructive" />
      </Carousel>
    </div>
  );
};
