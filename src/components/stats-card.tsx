import { cn } from "@/common/lib/utils"

interface StatsCardProps {
  className?: string
}

export function StatsCard({ className }: StatsCardProps) {
  return (
    <div className={cn("bg-white rounded-3xl p-8 shadow-xs", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center">
        <div className="flex flex-col items-center">
          <span className="text-[42px] font-bold text-[#111827] leading-none">+1 mil</span>
          <span className="text-sm text-[#4B5563] mt-2">Marcas registradas</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[42px] font-bold text-[#111827] leading-none">+700</span>
          <span className="text-sm text-[#4B5563] mt-2">Empresas protegidas</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[42px] font-bold text-[#111827] leading-none">+870 mil</span>
          <span className="text-sm text-[#4B5563] mt-2">Takedowns</span>
        </div>
      </div>
    </div>
  )
}

