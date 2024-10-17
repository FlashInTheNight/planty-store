import { Skeleton } from "../ui";

interface Props {
  className?: string;
  limit?: number;
}
export const FilterSkeleton: React.FC<Props> = ({ className, limit = 4 }) => {
  const skeletonItem = Array(limit)
    .fill(0)
    .map((_, index) => (
      <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
    ));

  const arraySkeleton = Array(3).fill(
    <div className="mb-10">{skeletonItem}</div>
  );

  return <div className={className}>{...arraySkeleton}</div>;
};
