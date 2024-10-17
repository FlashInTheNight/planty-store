import { OmitedCharacteristic } from "@/@types/prisma";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CharacteristicDictonary } from "@/constants/dictonary";

interface Props {
  className?: string;
  characteristic: OmitedCharacteristic;
}

export const AccordionBox: React.FC<Props> = ({
  className,
  characteristic,
}) => {
  const filteredCharacteristic = Object.fromEntries(
    Object.entries(characteristic).filter(([, value]) => value)
  );

  return (
    <Accordion type="single" collapsible className={className}>
      {Object.entries(filteredCharacteristic).map(([key, value]) => (
        <AccordionItem key={key} value={key}>
          <AccordionTrigger>
            {
              CharacteristicDictonary[
                key as keyof typeof CharacteristicDictonary
              ]
            }
          </AccordionTrigger>
          <AccordionContent>{value}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
