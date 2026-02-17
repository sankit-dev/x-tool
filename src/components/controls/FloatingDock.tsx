import { motion } from "framer-motion";
import {
  SlidersHorizontal,
  SquareArrowOutUpRight,
  LayoutGrid,
  Copy,
  Loader2,
  MoveHorizontal,
  PanelLeft,
  PanelRight,
} from "lucide-react";
import {
  useEditorStore,
  type ShadowType,
  type AspectRatioType,
  type DockPosition,
} from "@/hooks/use-editor-store";
import { GradientPicker } from "./GradientPicker";
import { ControlSlider } from "./ControlSlider";
import { GlassPanel, GlassToggle } from "@/components/glass";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface FloatingDockProps {
  onExport: () => Promise<void>;
  isExporting: boolean;
}

const shadowOptions: { label: string; value: ShadowType }[] = [
  { label: "None", value: "none" },
  { label: "Soft", value: "soft" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

const aspectRatios: { label: string; value: AspectRatioType }[] = [
  { label: "16:9", value: "16/9" },
  { label: "1:1", value: "1/1" },
  { label: "4:3", value: "4/3" },
];

const dockPositions: { icon: typeof PanelLeft; value: DockPosition }[] = [
  { icon: PanelRight, value: "left" },
  { icon: PanelLeft, value: "right" },
];

export function FloatingDock({ onExport, isExporting }: FloatingDockProps) {
  const {
    padding,
    borderRadius,
    imageRadius,
    shadow,
    aspectRatio,
    width,
    dockPosition,
    setPadding,
    setBorderRadius,
    setImageRadius,
    setShadow,
    setAspectRatio,
    setWidth,
    setDockPosition,
  } = useEditorStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: dockPosition === "left" ? -24 : 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 35 }}
      className="w-72 h-screen flex flex-col shrink-0"
    >
      <GlassPanel
        interactive={false}
        elevated
        rounded="2xl"
        className={cn(
          "h-full flex flex-col border-white/[0.1]",
          dockPosition === "left"
            ? "rounded-l-none rounded-r-2xl border-r"
            : "rounded-r-none rounded-l-2xl border-l",
        )}
      >
        <div className="flex-1 flex flex-col p-5 space-y-4 overflow-y-auto">
          {/* Position Toggle */}
          <div className="flex gap-2 justify-center">
            {dockPositions.map(({ icon: Icon, value }) => (
              <GlassToggle
                key={value}
                active={dockPosition === value}
                onClick={() => setDockPosition(value)}
                className="min-w-0 p-2.5"
                title={`Dock ${value}`}
              >
                <Icon className="w-4 h-4 mx-auto" />
              </GlassToggle>
            ))}
          </div>

          <Separator className="bg-white/[0.08]" />

          {/* Background Picker */}
          <GradientPicker />

          <Separator className="bg-white/[0.08]" />

        {/* Width Slider */}
        <ControlSlider
          icon={MoveHorizontal}
          label="Width"
          value={width}
          onChange={setWidth}
          min={400}
          max={1200}
          step={10}
        />

        {/* Padding Slider */}
        <ControlSlider
          icon={SlidersHorizontal}
          label="Padding"
          value={padding}
          onChange={setPadding}
          min={0}
          max={128}
        />

        {/* Canvas Radius Slider */}
        <ControlSlider
          icon={SquareArrowOutUpRight}
          label="Canvas Radius"
          value={borderRadius}
          onChange={setBorderRadius}
          min={0}
          max={48}
        />

        {/* Image Radius Slider */}
        <ControlSlider
          icon={SquareArrowOutUpRight}
          label="Image Radius"
          value={imageRadius}
          onChange={setImageRadius}
          min={0}
          max={48}
        />

          <Separator className="bg-white/[0.08]" />

          {/* Image Shadow */}
          <div>
            <p className="text-xs font-medium text-white/60 mb-2 px-1">
              Shadow
            </p>
            <div className="grid grid-cols-2 gap-2">
              {shadowOptions.map((option) => (
                <GlassToggle
                  key={option.value}
                  active={shadow === option.value}
                  onClick={() => setShadow(option.value)}
                >
                  {option.label}
                </GlassToggle>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div>
            <p className="text-xs font-medium text-white/60 mb-2 flex items-center gap-2 px-1">
              <LayoutGrid className="w-3.5 h-3.5" />
              Ratio
            </p>
            <div className="flex gap-2 flex-wrap">
              {aspectRatios.map((ratio) => (
                <GlassToggle
                  key={ratio.value}
                  active={aspectRatio === ratio.value}
                  onClick={() => setAspectRatio(ratio.value)}
                >
                  {ratio.label}
                </GlassToggle>
              ))}
            </div>
          </div>

          {/* Spacer to push button to bottom */}
          <div className="flex-1 min-h-4" />
        </div>

        {/* Export Button - glass-style primary */}
        <div className="p-4 pt-0">
          <motion.button
            type="button"
            onClick={onExport}
            disabled={isExporting}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white
              bg-white/15 border border-white/20
              shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_20px_rgba(0,0,0,0.2)]
              hover:bg-white/20 hover:border-white/30
              disabled:opacity-50 disabled:pointer-events-none
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            whileTap={{ scale: 0.98, y: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Copying...
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </motion.button>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
