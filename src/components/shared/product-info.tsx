import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Characteristic, Description } from "@prisma/client";
import { AccordionBox } from "./accordion-box";


interface Props {
  className?: string;
  characteristic: Omit<Characteristic, "id" | "createdAt" | "updatedAt">;
  description: Description;
}

export const ProductInfo: React.FC<Props> = ({
  className,
  characteristic,
  description,
}) => {
  return (
    <Tabs
      defaultValue="characteristic"
      className={cn("w-full h-[300px] overflow-y-auto", className)}
    >
      <TabsList>
        <TabsTrigger value="characteristic">Характеристики</TabsTrigger>
        <TabsTrigger value="description">Описание</TabsTrigger>
      </TabsList>
      <TabsContent value="characteristic">
        <AccordionBox characteristic={characteristic} />
      </TabsContent>
      <TabsContent value="description">
        <p>{description?.text || "Описание отсутствует"}</p>
      </TabsContent>
    </Tabs>
  );
};
